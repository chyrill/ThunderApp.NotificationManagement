import nodemailer from 'nodemailer';
import Notification from '../modules/notification/notification.model';
import MessageTemplate from '../modules/messagetemplate/messagetemplate.model';
import NotificationTemplate from '../modules/notificationtemplate/notificationtemplate.model';
import Queue from '../modules/queue/queue.model';
import smtpTransport from 'nodemailer-smtp-transport';

export default function SenderService () {
    console.log(`
==============================================
Sender Service Started ...
==============================================
`);
    try {
        setInterval(
            function () {
                Process();
            }, 3000
        );
    }
    catch (e) {
        
    }
}

async function Process() {
    var queueItems = await Queue.find({ Status: 'New', DeliveryDate : { $lt: new Date() } });
    
    for(let queueIndex in queueItems) {
        
        var notificationTemplateRes = await NotificationTemplate.findOne({ _id: queueItems[queueIndex].NotificationTemplateId });
        
        var messageTemplateRes = await MessageTemplate.findOne({ _id: notificationTemplateRes.MessageTemplateId });
        
        switch (notificationTemplateRes.Channel) {
            case 'Email':
                {
                
                    if (notificationTemplateRes.Service.toLowerCase() === 'gmail') {
                        let transporter = nodemailer.createTransport(smtpTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: notificationTemplateRes.AccountId,
                                pass: notificationTemplateRes.AccountToken
                            }
                        }));
                        
                        let mailOptions = {
                            from: notificationTemplateRes.Sender,
                            to: queueItems[queueIndex].Email,
                            subject: queueItems[queueIndex].Subject,
                            html: messageTemplateRes.ContentType === 'html' ? queueItems[queueIndex].Message: '',
                            text:  messageTemplateRes.ContentType === 'text' ? queueItems[queueIndex].Message: '',
                        }
                        
                        var counter = 0;
                        
                        do {
                            transporter.sendMail(mailOptions, (error, info) => {
                               if (error) {
                                   console.log(error);
                                   queueItems[queueIndex]['Tries'] += 1;
                                   counter ++;
                                   if (counter === 3) {
                                       queueItems[queueIndex].Status = 'Failed';
                                   }
                               } 
                                else {
                                    console.log(info);
                                    queueItems[queueIndex]['Tries'] += 1;
                                    queueItems[queueIndex].Status = 'Sent';
                                    counter = 4;
                                }
                            });
                            
                            transporter.quit();
                        }
                        while (counter < 3);
                        
                        await Queue.findOneAndUpdate({ _id: queueItems[queueIndex]._id }, queueItems[queueIndex], { Upsert: true, strict: false });
                    }
                    else {
                        let transporter = nodemailer.createTransport({
                            host: notificationTemplateRes.Service,
                            port: notificationTemplateRes.Port,
                            secure: notificationTemplateRes.Port === 465 ? true: false,
                            auth: {
                                user: notificationTemplateRes.AccountId,
                                pass: notificationTemplateRes.AccountToken
                            }
                        });
                        
                         let mailOptions = {
                            from: notificationTemplateRes.Sender,
                            to: queueItems[queueIndex].Email,
                            subject: queueItems[queueIndex].Subject,
                            html: messageTemplateRes.ContentType === 'html' ? queueItems[queueIndex].Message: '',
                            text:  messageTemplateRes.ContentType === 'text' ? queueItems[queueIndex].Message: '',
                        }
                         
                        do {
                            transporter.sendMail(mailOptions, (error, info) => {
                               if (error) {
                                   queueItems[queueIndex]['Tries'] += 1;
                                   counter ++;
                                   if (counter === 3) {
                                       queueItems[queueIndex].Status = 'Failed';
                                   }
                               } 
                                else {
                                    counter = 3;
                                    queueItems[queueIndex].Status = 'Sent';
                                }
                            });
                        }
                        while (counter > 3);
                        
                        await Queue.findOneAndUpdate({ _id: queueItems[queueIndex]._id }, queueItems[queueIndex], { Upsert: true, strict: false });
                    }
                        
                      break;  
                    }
            default:
                break;
                }
        }
}
