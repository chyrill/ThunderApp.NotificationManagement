import Notification from '../modules/notification/notification.model';
import MessageTemplate from '../modules/messagetemplate/messagetemplate.model';
import NotificationTemplate from '../modules/notificationtemplate/notificationtemplate.model';
import Queue from '../modules/queue/queue.model';
import smtpTransport from 'nodemailer-smtp-transport';
import email from 'emailjs';

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
            }, 10000
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
                        
                        var item = queueItems[queueIndex];
                        var server = email.server.connect({
                            user: notificationTemplateRes.AccountId,
                            password: notificationTemplateRes.AccountToken,
                            host: 'smtp.gmail.com',
                            ssl: true
                        });
                        
                        var message = {
                            text: messageTemplateRes.ContentType === 'text' ? queueItems[queueIndex].Message: '',
                            from: notificationTemplateRes.Sender,
                            to: queueItems[queueIndex].Email,
                            subject: queueItems[queueIndex].Subject,
                            attachment: [
                                {data: messageTemplateRes.ContentType === 'html' ? queueItems[queueIndex].Message: '', alternative: true}
                            ]
                        };
                        console.log(message)
                        var status = '';
                        
                        server.send(message, (err, message) => {
                            if (err) {
                                status = 'error';
                                item['Status'] ='Failed';
                                item['Tries'] += 1; 
                            }
                            else {
                                status = 'info';
                            }
                        });
                        
                        if (status !== null || status !== undefined) {
                            item['Status'] = status === 'error'? 'Failed': 'Sent';
                            item['Tries'] += 1; 
                            console.log(item);
                            await Queue.findOneAndUpdate({ _id: item._id }, item, { Upsert: true, strict: false });
                        }
                    }   
                      break;  
                    }
            default:
                break;
                }
        }
}
