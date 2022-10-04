import { Router } from 'express';
import storeRouter from './modules/store/infra/http/routes/Store.routes';

const routes = Router();

routes.use('/', storeRouter);

export default routes;
