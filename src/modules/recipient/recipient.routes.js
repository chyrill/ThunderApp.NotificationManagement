import { Router } from 'express';
import * as RecipientController from './recipient.controller';

const routes = new Router();

routes.post('', RecipientController.create);
routes.put('', RecipientController.update);
routes.delete('/:id', RecipientController.remove);
routes.get('/:id', RecipientController.getById);
routes.get('/searchAll', RecipientController.searchAll);
routes.get('', RecipientController.search);

export default routes;