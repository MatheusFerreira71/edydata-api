import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../../../../../config/multer';
import Auth from '../../../../../shared/middleware/Auth';
import ClientController from '../controllers/ClientController';

const clientRouter = Router();

const clientController = new ClientController();

const upload = multer(multerConfig);

clientRouter.post(
  '/client',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      CPF: Joi.string().required(),
      estadoCivil: Joi.string().required(),
      pai: Joi.string().allow(),
      mae: Joi.string().allow(),
      conjuge: Joi.string().allow(),
      rg: Joi.string().allow(),
      salario: Joi.number().required(),
      especie: Joi.string().required(),
      tituloEleitor: Joi.string().allow(),
      sexo: Joi.string().required(),
      celular: Joi.string().allow(),
      cep: Joi.string().allow(),
      endereco: Joi.string().allow(),
      complemento: Joi.string().allow(),
      numero: Joi.string().allow(),
      bairro: Joi.string().allow(),
      email: Joi.string().allow(),
      cidade: Joi.string().allow(),
      dataNascimento: Joi.date().allow(),
    },
  }),
  Auth,
  clientController.create,
);

clientRouter.put(
  '/client',
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().integer().required(),
      nome: Joi.string().allow(),
      CPF: Joi.string().allow(),
      estadoCivil: Joi.string().allow(),
      pai: Joi.string().allow(),
      mae: Joi.string().allow(),
      conjuge: Joi.string().allow(),
      rg: Joi.string().allow(),
      salario: Joi.number().allow(),
      especie: Joi.string().allow(),
      tituloEleitor: Joi.string().allow(),
      sexo: Joi.string().allow(),
      celular: Joi.string().allow(),
      cep: Joi.string().allow(),
      endereco: Joi.string().allow(),
      complemento: Joi.string().allow(),
      numero: Joi.string().allow(),
      bairro: Joi.string().allow(),
      email: Joi.string().allow(),
      cidade: Joi.string().allow(),
      dataNascimento: Joi.date().allow(),
    },
  }),
  Auth,
  clientController.update,
);

clientRouter.delete(
  '/client/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  Auth,
  clientController.delete,
);

clientRouter.get(
  '/client/name',
  celebrate({
    [Segments.QUERY]: {
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
      name: Joi.string().required(),
    },
  }),
  Auth,
  clientController.findByName,
);

clientRouter.get(
  '/client/date',
  celebrate({
    [Segments.QUERY]: {
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
    },
  }),
  Auth,
  clientController.findByBirthdate,
);

clientRouter.get(
  '/client/count-and-salary',
  celebrate({
    [Segments.QUERY]: {
      offset: Joi.number().integer().required(),
      limit: Joi.number().integer().required(),
      field: Joi.string().allow('cidade', 'sexo', 'especie'),
    },
  }),
  Auth,
  clientController.countAndSalary,
);

clientRouter.get(
  '/client/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  Auth,
  clientController.findById,
);

clientRouter.post(
  '/client/import',
  upload.single('file'),
  Auth,
  clientController.importData,
);

export default clientRouter;
