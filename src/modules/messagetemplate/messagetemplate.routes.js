import { Router } from 'express';

import * as MessageTemplateController from './messagetemplate.controller';

const routes = new Router();

routes.post('', MessageTemplateController.create);
routes.get('/:id', MessageTemplateController.getById);
routes.get('/searchAll', MessageTemplateController.searchAll);
routes.get('', MessageTemplateController.search);
routes.delete('/:id', MessageTemplateController.remove);
routes.put('', MessageTemplateController.update);

export default routes;