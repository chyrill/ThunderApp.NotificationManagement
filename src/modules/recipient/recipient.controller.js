import Recipient from './recipient.model';
import { Authorization } from '../../helpers/Authorization';
import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { QueryFilters } from '../../helpers/QueryFilters';
import axios from 'axios';

export async function create(req, res) {
    var result = new Result();
    
    try {
        
        var createRes = await Recipient.create(req.body);
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/userInfo/setcontactid',
            data: {
                UserId: req.body.UserId,
                ContactId: createRes._id
            }
        })
            .then (response => {
            })
            .catch (err => {
            })
        result.successful = true;
        result.model = createRes;
        result.message = 'Successfully added record';
        
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e)
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;
        
        return res.status(500).json(result)
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
        
        var updateRes = await Recipient.findOneAndUpdate({ _id: req.body._id }, req.body, { Upsert: true, strict: false });
        
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
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';
        }
        
        var getRes = await Recipient.findOne({ _id: id });
        
        result.successful = true;
        result.model = getRes;
        result.message = 'Successfully retrieve data';
        
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
            result.successful = false;
            result.model = null;
            result.message = 'Id is required';
            
            return res.status(400).json(result);
        }
        
        await Recipient.findOneAndRemove({ _id: id });
        
        result.successful = true;
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

export async function searchAll(req, res) {
    var result = new SearchResult();
    
    try {
        var authenticationRes = await Authorization(req.headers.authorization);
                        
        if (authenticationRes.successful != true) {
            result.successful = false;
            result.item = req.body;
            result.message = authenticationRes.message;
            return res.status(401).json(result);
        }
        else {
            req.body.Context = authenticationRes.model.Context;
            req.body.CreatedBy = authenticationRes.model.Name;
        }
        
        var searchRes = await Recipient.find({ Context: req.body.Context });
        
        result.items = searchItemRes;
        result.totalcount = searchItemRes.length;
        result.pages = 1;
        result.message = 'Successfully retrieve records';
        result.successful = true;
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 1;
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
        
        var searchItemRes = await Recipient.find(filters);
        
        var totalCount = searchItemRes.length;
        var pages = Math.ceil(searchItemRes.length/req.query.limit);
        
        var finalItemRes = await Recipient.find(filters).skip(Number(req.query.skip)).limit(Number(req.query.limit)).sort(req.query.sort);
        
        result.items = finalItemRes;
        result.totalcount = totalCount;
        result.pages = pages;
        result.message = 'Successfully retrieve record';
        result.successful = true;
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.items = 0;
        result.totalcount = 0;
        result.pages = 1;
        result.message = e.errmsg;
        result.successful = false;
        
        return res.status(500).json(result);   
    }
}