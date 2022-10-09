import { Request, Response } from 'express';
import AppError from '../../../../../shared/errors/AppError';
import DiskStorageProvider from '../../../../../shared/providers/storageProvider/implementations/DiskStorageProvider';
import CreateClientService from '../../../services/CreateClientService';
import DeleteClientService from '../../../services/DeleteClientService';
import FindClientByIdService from '../../../services/FindClientByIdService';
import FindClientsByBirthDateService from '../../../services/FindClientsByBirthDateService';
import FindClientsByNameService from '../../../services/FindClientsByNameService';
import FindCountAndTotalSalaryService from '../../../services/FindCountAndTotalSalaryService';
import ImportClientDataService from '../../../services/ImportClientDataService';
import UpdateClientService from '../../../services/UpdateClientService';
import ClientRepository from '../../database/ClientRepository';

export default class ClientController {
  public async create(req: Request, res: Response): Promise<Response> {
    const clientRepo = new ClientRepository();

    const {
      nome,
      CPF,
      estadoCivil,
      pai,
      mae,
      conjuge,
      rg,
      salario,
      especie,
      tituloEleitor,
      sexo,
      celular,
      cep,
      endereco,
      complemento,
      numero,
      bairro,
      email,
      cidade,
      dataNascimento,
    } = req.body;

    const createClient = new CreateClientService(clientRepo);

    const client = await createClient.execute({
      nome,
      CPF,
      estadoCivil,
      pai,
      mae,
      conjuge,
      rg,
      salario,
      especie,
      tituloEleitor,
      sexo,
      celular,
      cep,
      endereco,
      complemento,
      numero,
      bairro,
      email,
      cidade,
      dataNascimento,
    });

    return res.json(client);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const clientRepo = new ClientRepository();

    const {
      id,
      nome,
      CPF,
      estadoCivil,
      pai,
      mae,
      conjuge,
      rg,
      salario,
      especie,
      tituloEleitor,
      sexo,
      celular,
      cep,
      endereco,
      complemento,
      numero,
      bairro,
      email,
      cidade,
      dataNascimento,
    } = req.body;

    const updateClient = new UpdateClientService(clientRepo);

    const client = await updateClient.execute(id, {
      nome,
      CPF,
      estadoCivil,
      pai,
      mae,
      conjuge,
      rg,
      salario,
      especie,
      tituloEleitor,
      sexo,
      celular,
      cep,
      endereco,
      complemento,
      numero,
      bairro,
      email,
      cidade,
      dataNascimento,
    });

    return res.json(client);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const clientRepo = new ClientRepository();

    const { id } = req.params;

    const deleteClient = new DeleteClientService(clientRepo);

    const deleteMessage = await deleteClient.execute(Number(id));

    return res.json(deleteMessage);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const clientRepo = new ClientRepository();

    const { id } = req.params;

    const findById = new FindClientByIdService(clientRepo);

    const client = await findById.execute(Number(id));

    return res.json(client);
  }

  public async findByName(req: Request, res: Response): Promise<Response> {
    const clientRepo = new ClientRepository();

    const { name } = req.query;

    const findByName = new FindClientsByNameService(clientRepo);

    const clients = await findByName.execute(String(name));

    return res.json(clients);
  }

  public async findByBirthdate(req: Request, res: Response): Promise<Response> {
    const clientRepo = new ClientRepository();

    const { startDate, endDate } = req.query;

    const findByBirthdate = new FindClientsByBirthDateService(clientRepo);

    const clients = await findByBirthdate.execute(
      new Date(String(startDate)),
      new Date(String(endDate)),
    );

    return res.json(clients);
  }

  public async countAndSalary(req: Request, res: Response): Promise<Response> {
    const clientRepo = new ClientRepository();
    const { field } = req.query;

    const countAndSalary = new FindCountAndTotalSalaryService(clientRepo);

    if (field !== 'cidade' && field !== 'sexo' && field !== 'especie') {
      throw new AppError('Campo field informado incorretamente', 409);
    }

    const clients = await countAndSalary.execute(field);

    return res.json(clients);
  }

  public async importData(req: Request, res: Response): Promise<Response> {
    const clientRepo = new ClientRepository();
    const diskStorage = new DiskStorageProvider();

    const importDataService = new ImportClientDataService(
      clientRepo,
      diskStorage,
    );

    if (!req.file) {
      throw new AppError('XML não encontrado', 404);
    }

    const importedClients = await importDataService.execute(req.file.filename);

    return res.json(`Clientes importados: ${importedClients}`);
  }
}
