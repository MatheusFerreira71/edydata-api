import { Router } from 'express';
import clientRouter from './modules/client/infra/http/routes/Cliente.routes';
import sessionsRouter from './modules/user/infra/http/routes/Session.routes';
import userRouter from './modules/user/infra/http/routes/User.routes';

const routes = Router();

routes.use('/', sessionsRouter);
routes.use('/', userRouter);
routes.use('/', clientRouter);

export default routes;
