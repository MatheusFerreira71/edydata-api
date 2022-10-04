import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import StoreController from '../controllers/StoreController';
import Auth from '../../../../../shared/middleware/Auth';
import Admin from '../../../../../shared/middleware/Admin';

const storeRouter = Router();

const storeController = new StoreController();

storeRouter.get(
  '/authorize',
  celebrate({ [Segments.QUERY]: { code: Joi.string().required() } }),
  storeController.create,
);

storeRouter.get(
  '/stores',
  celebrate({
    [Segments.QUERY]: {
      search: Joi.string().allow(''),
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
    },
  }),
  Auth,
  Admin,
  storeController.findAll,
);

storeRouter.get(
  '/store/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.number().integer().required() } }),
  Auth,
  Admin,
  storeController.findOne,
);

storeRouter.put(
  '/store',
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().integer().allow(''),
      name: Joi.string().allow(''),
      contact_email: Joi.string().allow(''),
      nuvemshop_email: Joi.string().allow(''),
      nuvemshop_domain: Joi.string().allow(''),
    },
  }),
  Auth,
  Admin,
  storeController.update,
);

storeRouter.post(
  '/uninstall',
  celebrate({
    [Segments.BODY]: { store_id: Joi.number().integer().required() },
  }),
  storeController.uninstall,
);

storeRouter.post(
  '/activate',
  celebrate({
    [Segments.BODY]: {
      nuvemShopIdStore: Joi.number().integer().required(),
      nuvemShopStoreToken: Joi.string().required(),
    },
  }),
  Auth,
  storeController.activate,
);

storeRouter.post(
  '/deactivate',
  celebrate({
    [Segments.BODY]: {
      nuvemShopIdStore: Joi.number().integer().required(),
      nuvemShopStoreToken: Joi.string().required(),
    },
  }),
  Auth,
  storeController.deactivate,
);

storeRouter.delete(
  '/store/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.number().integer().required() } }),
  Auth,
  Admin,
  storeController.delete,
);

export default storeRouter;
