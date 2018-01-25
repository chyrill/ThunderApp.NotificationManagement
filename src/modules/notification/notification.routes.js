import { Router } from 'express';
import * as NotificationController from './notification.controller';

const routes = new Router();

routes.post('/sendSimple', NotificationController.sendSimple);
routes.post('/sendBulk', NotificationController.sendSimpleBulk);
routes.post('/sendPairMessage', NotificationController.sendPairMessage);

export default routes;