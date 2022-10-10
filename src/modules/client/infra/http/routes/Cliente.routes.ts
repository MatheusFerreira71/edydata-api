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
      pai: Joi.string().allow(null, ''),
      mae: Joi.string().allow(null, ''),
      conjuge: Joi.string().allow(null, ''),
      rg: Joi.string().allow(null, ''),
      salario: Joi.number().required(),
      especie: Joi.string().required(),
      tituloEleitor: Joi.string().allow(null, ''),
      sexo: Joi.string().required(),
      celular: Joi.string().allow(null, ''),
      cep: Joi.string().allow(null, ''),
      endereco: Joi.string().allow(null, ''),
      complemento: Joi.string().allow(null, ''),
      numero: Joi.string().allow(null, ''),
      bairro: Joi.string().allow(null, ''),
      email: Joi.string().allow(null, ''),
      cidade: Joi.string().allow(null, ''),
      dataNascimento: Joi.date().allow(null, ''),
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
      nome: Joi.string().allow(null),
      CPF: Joi.string().allow(null),
      estadoCivil: Joi.string().allow(null),
      pai: Joi.string().allow(null),
      mae: Joi.string().allow(null),
      conjuge: Joi.string().allow(null),
      rg: Joi.string().allow(null),
      salario: Joi.number().allow(null),
      especie: Joi.string().allow(null),
      tituloEleitor: Joi.string().allow(null),
      sexo: Joi.string().allow(null),
      celular: Joi.string().allow(null),
      cep: Joi.string().allow(null),
      endereco: Joi.string().allow(null),
      complemento: Joi.string().allow(null),
      numero: Joi.string().allow(null),
      bairro: Joi.string().allow(null),
      email: Joi.string().allow(null),
      cidade: Joi.string().allow(null),
      dataNascimento: Joi.date().allow(null),
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
      name: Joi.string().required(),
    },
  }),
  clientController.findByName,
);

clientRouter.get(
  '/client/date',
  celebrate({
    [Segments.QUERY]: {
      startDate: Joi.string().required(),
      endDate: Joi.string().required(),
    },
  }),
  clientController.findByBirthdate,
);

clientRouter.get(
  '/client/count-and-salary',
  celebrate({
    [Segments.QUERY]: {
      field: Joi.string().allow('cidade', 'sexo', 'especie'),
    },
  }),
  clientController.countAndSalary,
);

clientRouter.get(
  '/client/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  clientController.findById,
);

clientRouter.post(
  '/client/import',
  upload.single('file'),
  Auth,
  clientController.importData,
);

export default clientRouter;
