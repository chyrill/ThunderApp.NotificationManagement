import { Router } from 'express';
import * as NotificationTemplateController from './notificationtemplate.controller';

const routes = new Router();

routes.post('', NotificationTemplateController.create);
routes.put('', NotificationTemplateController.update); 
routes.get('/:id', NotificationTemplateController.getById);
routes.get('/searchAll', NotificationTemplateController.searchAll);
routes.get('', NotificationTemplateController.search);
routes.delete('/:id', NotificationTemplateController.remove);

export default routes;