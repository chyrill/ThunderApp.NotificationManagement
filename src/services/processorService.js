import Notification from '../modules/notification/notification.model';
import MessageTemplate from '../modules/messagetemplate/messagetemplate.model';
import NotificationTemplate from '../modules/notificationtemplate/notificationtemplate.model';

export default function ProcessorService() {
    
    console.log (`
                  =========================================
                  Processor Service Started ....  
                  =========================================
                `);
    
    try {
        setInterval(
            function () {
                
            }, 30000
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
        
        var notificationTemplateRes  = await Notification.findOne({ _id: item.NotificationTemplateId });
        
        var messageTemplateRes = await MessageTemplate.findOne({ _id: notificationTemplateRes.MessageTemplateId });
        
        var message = ParseText(messageTemplateRes.Message, item.Payload);
    }
}

function getListOfReplacement(message, payload) {
    var text = message;
    var listOfPairText = [];
    var haveToReplace = true;
    
    do {
        
    }
    while (haveToReplace)
}