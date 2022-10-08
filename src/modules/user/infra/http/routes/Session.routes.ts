import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionController from '../controllers/SessionController';
import Auth from '../../../../../shared/middleware/Auth';

const sessionsRouter = Router();

const sessionsController = new SessionController();

sessionsRouter.post(
  '/authenticate',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        })
        .required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.put(
  '/change-password',
  celebrate({
    [Segments.BODY]: {
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    },
  }),
  Auth,
  sessionsController.changePassword,
);

export default sessionsRouter;
