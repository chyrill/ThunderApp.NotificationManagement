import Notification from './notification.model';
import { Authorization } from '../../helpers/Authorization';
import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { QueryFilters } from '../../helpers/QueryFilters';
import Recipient from '../recipient/recipient.model';
import NotificationTemplate from '../notificationtemplate/notificationtemplate.model';

export async function sendSimple(req, res) {
    var result = new Result();
    
    try {
        var authenticationRes = await Authorization(req.headers.authorization);
        
        var recipientIds = [];
        var payload = [];
        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        }
        else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }
        
        var checkRecipient = await checkIfValidRecipient(req.body.RecipientId);
        
        if (!checkRecipient.successful) {
            
            result.successful = false;
            result.model = checkRecipient.model;
            result.message = checkRecipient.message;
            
            return res.status(400).json(result);
        }
        
        var checkNotificationTemplate = await checkIfValidNotificationTemplate(req.body.NotificationTemplateId);
        
        if (!checkNotificationTemplate.successful) {
            result.successful = false;
            result.model = checkIfValidNotificationTemplate.model;
            result.message = checkIfValidNotificationTemplate.message;
            
            return res.status(400).json(result);
        }
        
        req.body.Status = 'New';
        
        var createRes = await Notification.create(req.body);
        
        result.successful = true;
        result.model = createRes;
        result.message = 'Successfully created record';
        
        return res.status(200).json(result);
    
    }
    catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;
        
        return res.status(500).json(result);
    }
}

export async function sendSimpleBulk(req, res) {
    var result = new Result();
    
    try {
        var authenticationRes = await Authorization(req.headers.authorization);
                        
        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        }
        else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }
        
        var checkNotificationTemplate = await checkIfValidNotificationTemplate(req.body.NotificationTemplateId);
        
        if (!checkIfValidNotificationTemplate.successful) {
            result.successful = false;
            result.model = checkIfValidNotificationTemplate.model;
            result.message = checkIfValidNotificationTemplate.message;
            
            return res.status(400).json(result);
        }
        
        for (let recipient in req.body.RecipientIds) {
            
            var checkRecipient = await checkIfValidRecipient(req.body.RecipientId[recipient]);
            
            if (!checkRecipient.successful) {
                result.successful = false;
                result.model = checkRecipient.model;
                result.message = checkRecipient.message;
            
                return res.status(400).json(result);
            }
        }
        
        var payload = {
            Context: req.body.Context,
            CreatedBy: req.body.CreatedBy,
            Payload: req.body.Payload,
            DeliveryDate: req.body.DeliveryDate,
            Status: 'New',
            NotificationTemplateId: req.body.NotificationTemplateId
        };
        
        for (let recipient in req.body.RecipientIds) {
            payload['RecipientId'] = req.body.RecipientIds[recipient];
            
            var createRes = await Notification.create(payload);
        }
        
        result.successful = true;
        result.model = req.body;
        result.message = 'Successfully created record';
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;
        
        return res.status(500).json(result);
    }
}

export async function sendPairMessage(req, res) {
    var result = new Result();
    
    try {
        var authenticationRes = await Authorization(req.headers.authorization);
                        
        if (authenticationRes.successful != true) {
            result.successful = false;
            result.model = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        }
        else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }
        
         var checkNotificationTemplate = await checkIfValidNotificationTemplate(req.body.NotificationTemplateId);
        
        if (!checkIfValidNotificationTemplate.successful) {
            result.successful = false;
            result.model = checkIfValidNotificationTemplate.model;
            result.message = checkIfValidNotificationTemplate.message;
            
            return res.status(400).json(result);
        }
        
         var payload = {
            Context: req.body.Context,
            CreatedBy: req.body.CreatedBy,
            DeliveryDate: req.body.DeliveryDate,
            Status: 'New',
            NotificationTemplateId: req.body.NotificationTemplateId
        };
        
        for (let pairRecipientPayload in req.body.PairPayload) {
            var checkRecipient = await checkIfValidRecipient(req.body.PairPayload[pairRecipientPayload].RecipientId);
            
            if (!checkRecipient.successful) {
                result.successful = false;
                result.model = checkRecipient.model;
                result.message = checkRecipient.message;
            
                return res.status(400).json(result);
            }
        }
        
        for (let pair in req.body.PairPayload) {
            
            payload['RecipientId'] = req.body.PairPayload[pairRecipientPayload].RecipientId;
            payload['Payload'] = req.body.PairPayload[pairRecipientPayload].Payload;
            
            await Notification.create(payload);
        }
        
        result.successful = true;
        result.model = req.body;
        result.message = 'Successfully created record';
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;
        
        return res.status(500).json(result);
    }
}

async function checkIfValidRecipient(id) {
    var result = new Result();
    
    try {
        var recipientRes = await Recipient.findOne({ _id: id });
        
        if (recipientRes === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Recipient not valid';
            
            return result;
        }
        
        result.successful = true;
        result.model = recipientRes;
        result.message = 'Recipient found';
        
        return result;
    }
    catch (e) {
        result.successful = false;
        result.model = null;
        result.message = 'Recipient not valid'; 
        
        return result;
    }
}

async function checkIfValidNotificationTemplate(id) {
    var result = new Result();
    
    try {
        var notifcationTemplateRes = await NotificationTemplate.findOne({ _id: id });
        
        if (notifcationTemplateRes === null) {
            result.successful = false;
            result.model = null;
            result.message = 'Notification template invalid';
            
            return result;
        }
        
        result.successful = true;
        result.model = notifcationTemplateRes;
        result.message = 'Successfully retrieve notification';
        
        return result;  
    }
    catch (e) {
        result.successful = false;
        result.model = null;
        result.message = 'Notification template invalid';
        
        return result;
    }
}