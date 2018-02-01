import Notification from '../modules/notification/notification.model';
import MessageTemplate from '../modules/messagetemplate/messagetemplate.model';
import NotificationTemplate from '../modules/notificationtemplate/notificationtemplate.model';
import Recipient from '../modules/recipient/recipient.model';
import Queue from '../modules/queue/queue.model';
import fs from 'fs';
import createHTML from 'create-html';
import decode from 'unescape';

export default function ProcessorService() {
    
    console.log (`
                  =========================================
                  Processor Service Started ....  
                  =========================================
                `);
    
    try {
        setInterval(
            function () {
                 Processor();
            }, 1000
        );
    }
    catch (e) {
        console.log(e);
    }
}

async function Processor() {
   
    var notificationItems = await Notification.find({ Status: 'New' });
    
    for (let notification in notificationItems) {
      
        var item = notificationItems[notification];
      
        var queue = {
            Context: item.Context,
            Email: '',
            PhoneNumber: '',
            NotificationTemplateId: '',
            Subject: '',
            DeliveryDate: new Date(),
            Message: '',
            Status: 'New'
        };
        
        var notificationTemplateRes  = await NotificationTemplate.findOne({ _id: item.NotificationTemplateId });
       
        queue.NotificationTemplateId = notificationTemplateRes._id;
        
        var messageTemplateRes = await MessageTemplate.findOne({ _id: notificationTemplateRes.MessageTemplateId });
        
        
        
        queue.Message = parseMessage(messageTemplateRes.Message, item.Payload);
        console.log(decode(queue.Message))
        queue.Subject = parseMessage(messageTemplateRes.Subject, item.Payload);
        
        var recipientRes =  await Recipient.findOne({ _id: item.RecipientId });
       
        if (messageTemplateRes.ContentType === 'html') {
            var html = createHTML({
                body: queue.Message
            })
            fs.writeFile('email.html', queue.Message, err => {
                if (err) {
                    console.log(err)
                }
            });
        }
        queue.Email = recipientRes.Email;
        queue.PhoneNumber = recipientRes.PhoneNumber;
     
        var createRes =  await Queue.create(queue);
        
        
        item.Status = 'Parsed';
        
        var updateNotif = await Notification.findOneAndUpdate({ _id: item._id }, item, { Upsert: true, strict: false });
     
    }
}

function getListOfReplacement(message) {
    var text = message;
    var listOfPairText = [];
    var haveToReplace = true;
    
    do {
        var bracket = text.indexOf('{{');
        
        if (bracket < 0) {
            haveToReplace = false;
        }
        else {
            var replacementTag = text.substring(text.indexOf('{{'), text.indexOf('}}') + 2);
            listOfPairText.push(replacementTag);
            text = text.replace(replacementTag, '');
        }
        
    }
    while (haveToReplace)
    
    return listOfPairText;
}

function parseTable(message, payload) {
    var text = message;
    
    var finalTable = '';
    
    var hasTableToReplace = true;
    
    do {
        if (text.indexOf('[{Loop}]') < 0) {
           
            break;
        }
        else {
             
            var replacementTable = text.substring(text.indexOf('[{Loop}]'), text.indexOf('[{/Loop}]') + 9);
          
            var tableText = text.substring(text.indexOf('[{Loop}]') + 8, text.indexOf('[{/Loop}]'));
              
            var tableReplacementTags = getListOfReplacement(tableText);
          
            var propName = '';
    
            for (let item in tableReplacementTags) {
                propName = getArrayPropertyName(tableReplacementTags[item]);
               
                if (propName !== null || propName !== undefined) {
                    break;
                }
            }
          
            for (let item in payload[propName]) {
                finalTable += replaceTags(tableText, payload, tableReplacementTags, item);
            }
            
            text = text.replace(replacementTable, finalTable);
            finalTable = '';
        }
    }
    
    while (hasTableToReplace)
    return text;
}

function getArrayPropertyName(replacementTag) {
    if (replacementTag.indexOf('.') < 0) {
        return null;
    }
    else {
        return replacementTag.split('.')[0].replace('{{','');
    }
}

function replaceTags(message, payload, replacementTags, index) {
   
    for (let item in replacementTags ) {
        if (replacementTags[item].indexOf('.') >= 0 && index >= 0) {
          
            var propName = replacementTags[item].split('.')[0].replace('{{', '');
            var propValue = replacementTags[item].split('.')[1].replace('}}', '');
            var data = payload[propName][index][propValue];
            
            message = message.replace(replacementTags[item], data);
          
        }
        else if (replacementTags[item].indexOf('.') > 0 && index < 0) {
            var propName = replacementTags[item].split('.')[0].replace('{{', '');
            var propValue = replacementTags[item].split('.')[1].replace('}}', '');
            var data = payload[propName][propValue];
            
            message = message.replace(replacementTags[item], data);
        }
        else if (replacementTags[item].indexOf('.') < 0) {
            var data = payload[replacementTags[item].replace('{{', '').replace('}}', '')];
            message = message.replace(replacementTags[item], data);
        }
    }

    return message;
}

function parseMessage(message, payload) {
    var text = message;
    
    if (message.indexOf('[{Loop}]') >= 0) {
        text = parseTable(message, payload);
        var replacementTags = getListOfReplacement(text);
        text = replaceTags(text, payload, replacementTags, -1);
         return text;
    }
    else {
        var replacementTags = getListOfReplacement(message);
        text = replaceTags(text, payload, replacementTags, -1);
        return text;
    }
    
   
}