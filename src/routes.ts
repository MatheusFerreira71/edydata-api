import { Router } from 'express';
import sessionsRouter from './modules/user/infra/http/routes/Session.routes';
import userRouter from './modules/user/infra/http/routes/User.routes';

const routes = Router();

routes.use('/', sessionsRouter);
routes.use('/', userRouter);

export default routes;
