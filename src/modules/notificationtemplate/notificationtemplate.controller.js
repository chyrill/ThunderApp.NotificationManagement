import NotificationTemplate from './notificationtemplate.model';
import { Authorization } from '../../helpers/Authorization';
import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { QueryFilters } from '../../helpers/QueryFilters';
import MessageTemplate from '../messagetemplate/messagetemplate.model';

export async function create(req, res) {
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
        
        if (!await ifMessageTemplateExisted(req.body.MessageTemplateId)) {
            result.successful =  false;
            result.model = req.body;
            result.message = 'Message Template does not exist';
            
            return res.status(400).json(result);
        }
        
        var createRes = await NotificationTemplate.create(req.body);
        
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

export async function update(req, res) {
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
            req.body.UpdatedBy = authenticationRes.model.Name;
            req.body.DateUpdated = new Date();
        }
        
        if (!await ifMessageTemplateExisted(req.body.MessageTemplateId)) {
            result.successful = false;
            result.model = req.body;
            result.message = 'Message Template does not exist';
            
            return res.status(400).json(result);
        }
        
        var updateRes = await NotificationTemplate.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });
        
        result.successful = true;
        result.model = updateRes;
        result.message = 'Successfully updated record';
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;
        
        return res.status(500).json(result);
    } 
}

export async function getById(req, res) {
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
        
        var id = req.params.id;
        
        if (id === null) {
            result.successful =  false;
            result.model = null;
            result.message = 'Id is required';
            
            return res.status(400).json(result);
        }
        
        var searchItems = await NotificationTemplate.findOne({ _id: id, Context: req.body.Context});
        
        if (searchItems === null) {
            result.successful = false;
            result.model = null;
            result.message = 'record not found';
            
            return res.status(400).json(result); 
        }
        
        result.successful = true; 
        result.model = searchItems;
        result.message = 'Successfully retrieve record';
        
        return res.status(200).json(result);
        
    }
    catch (e) {
        result.successful = false; 
        result.model = null;
        result.message = e.errmsg;
        
        return res.status(500).json(result);
    }
}

export async function remove(req, res) {
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
        
        var id = req.params.id;
        
        if (id === null) {
            result.successful =  false;
            result.model = null;
            result.message = 'Id is required';
            
            return res.status(400).json(result);
        }
        
        await NotificationTemplate.findOneAndRemove({ _id: id });
        
        result.successful = true;
        result.model = null;
        result.message = 'Successfully remove record';
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.successful = false; 
        result.model = null;
        result.message = e.errmsg;
        
        return res.status(500).json(result);
    }
}

export async function searchAll(req, res) {
    var result = new SearchResult();
    
    try {
        var authenticationRes = await Authorization(req.headers.authorization);
                        
        if (authenticationRes.successful != true) {
            result.successful = false;
            result.items = null;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        }
        else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }
        
        var searchItems = await NotificationTemplate.find({ Context: req.body.Context });
        
        result.items = searchItems;
        result.totalcount = searchItems.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';
        result.successful = true;
        
        return res.status(200).json(result)
    }
    catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;
        
        return res.status(500).json(result);
    }
}

export async function search(req, res) {
    var result = new SearchResult();
    
    try {
        var authenticationRes = await Authorization(req.headers.authorization);
                        
        if (authenticationRes.successful != true) {
            result.successful = false;
            result.items = null;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        }
        else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }
        
        if (req.query.limit === null || req.query.limit === undefined) {
            req.query.limit = 20;
        }
        var filters = {}
        if (req.query.Filters != null) {
            filters = QueryFilters(req.query.Filters, req.query.Context);
        }
        else {
            filters["Context"] = req.query.Context;
        }
        
        var searchItemRes = await NotificationTemplate.find(filters);
        
        var totalcount = searchItemRes.length;
        var pages = Math.ceil(searchItemRes.length/req.query.limit);
        
        var finalItemRes = await NotificationTemplate.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);
        
        result.items = finalItemRes;
        result.totalcount = totalcount;
        result.pages = pages;
        result.message = 'Sucessfully retrieve record';
        result.successful = true;
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;
        
        return res.status(500).json(result);
    }
}

async function ifMessageTemplateExisted(id) {
    var messageTemplate = await MessageTemplate.findOne({ _id: id});
    
    if (messageTemplate !== null)
        return true;
    
    return false;
}