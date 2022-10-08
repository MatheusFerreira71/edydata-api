import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';
import Auth from '../../../../../shared/middleware/Auth';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/user',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        })
        .required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

userRouter.get('/user', Auth, userController.findOne);

userRouter.put(
  '/user',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().allow(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'br'] },
        })
        .allow(),
    },
  }),
  Auth,
  userController.update,
);

userRouter.delete('/user', Auth, userController.delete);

export default userRouter;
