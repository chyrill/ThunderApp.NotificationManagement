import MessageTemplate from './messagetemplate.model';
import { Authorization } from '../../helpers/Authorization';
import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { QueryFilters } from '../../helpers/QueryFilters';
import NotificationTemplate from '../notificationtemplate/notificationtemplate.model';

export async function create(req, res) {
    var result = new Result();
    try {
        var authenticationRes = await Authorization(req.headers,authorization);
        
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
        
        var messagetemplateRes = await MessageTemplate.create(req.body);
        
        result.successful = true;
        result.model = messagetemplateRes;
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

export async function searchAll(req, res) {
    var result = new SearchResult();
    
    try {
        var authenticationRes = await Authorization(req.headers,authorization);
                        
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
        
        var messagetemplateRes = await MessageTemplate.find({Context: req.body.Context});
        
        result.items = messagetemplateRes;
        result.totalcount = messagetemplateRes.length; 
        result.pages = 1;
        result.message = 'Successfully retrieve records';
        result.successful = true;
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.items = null;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;
        
        return res.status(500).json(result);
    }
}

export async function update(req, res) {
    var result = new Result();
    
    try {
        var authenticationRes = await Authorization(req.headers,authorization);
                        
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
        
        var messagetemplateRes = await MessageTemplate.findOneAndUpdate({_id: req.body._id}, req.body, { Upsert: true, strict: false });
        
        result.successful = true; 
        result.model = messagetemplateRes;
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
        var authenticationRes = await Authorization(req.headers,authorization);
                        
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
            result.message = 'Id must not be null';
            return res.status(400).json(result);
        }
        
        var messagetemplateRes = await MessageTemplate.findOne({_id: id, Context: req.body.Context});
        
        if (messagetemplateRes === null) {
            result.successful = false; 
            result.model = null;
            result.message = 'Record not found';
            
            return res.status(400).json(result);
        }
        
        result.successful = true;
        result.model = messagetemplateRes;
        result.message = 'Successfully found record';
        
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
        var authenticationRes = await Authorization(req.headers,authorization);
                        
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
        
        var id = req.param.id;
        
        if (id === null) {
            result.successful = false; 
            result.model = null;
            result.message = 'Id must not be null';
            
            return res.status(400).json(result);
        }
        
        if (ifMessageTemplateUsed(id)) {
            result.successful =  false;
            result.model = null;
            result.message = 'Message Template is currently in used';
            
            return res.status(400).json(result);
        }
        
        await MessageTemplate.findOneAndRemove({ _id: id, Context: req.body.Context });
        
        result.successful = false;
        result.model = null; 
        result.message = 'Successfully deleted record';
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.successful = false;
        result.model = null;
        result.message = e.errmsg;
        
        return res.status(500).json(result);
    }
}

export async function search(req, res) {
    var result = new SearchResult();
    
    try {
        var authenticationRes = await Authorization(req.headers,authorization);
                        
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
        
        var searchItemsRes = await MessageTemplate.find(filters);
        
        var pages = Math.ceil(searchItemsRes.length/req.query.limit);
        var totalcount = searchItemsRes.length;
        
        var finalItemRes = await MessageTemplate.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);
        
        result.items = finalItemRes;
        result.totalcount = totalcount;
        result.pages = pages;
        result.message = 'Successfully retrieve data';
        result.successful = true;
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.items = null;
        result.totalcount = 0;
        result.pages = 0;
        result.message = e.errmsg;
        result.successful = false;
        
        return res.status(500).json(result);
    }
}

function ifMessageTemplateUsed(id) {
    var searchItems = await NotificationTemplate.find({ MessageTemplateId: id})
    
    if (searchItems.length > 0)
        return true;
    
    return false;
}
