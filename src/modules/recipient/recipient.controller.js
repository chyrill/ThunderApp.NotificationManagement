import Recipient from './recipient.model';
import { Authorization } from '../../helpers/Authorization';
import Result from '../../helpers/Result';
import SearchResult from '../../helpers/SearchResult';
import { QueryFilters } from '../../helpers/QueryFilters';

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
        
        var createRes = await Recipient.create(req.body);
        
        result.successful = true;
        result.model = createRes;
        result.message = 'Successfully added record';
        
        return res.status(200).json(result);
    }
    catch (e) {
        result.successful = false;
        result.model = req.body;
        result.message = e.errmsg;
        
        return res.status(500).json(result)
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