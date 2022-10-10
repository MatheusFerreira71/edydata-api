import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IClientRepository from '../repositories/IClientRepository';

export default class CreateClientService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(data: ICreateClientDTO): Promise<Client> {
    const hasClient = await this.clientRepo.findByCPF(data.CPF);

    if (hasClient) {
      throw new AppError('CPF já existente', 409);
    }

    const client = await this.clientRepo.create(data).catch(err => {
      throw new AppError(`${err}`);
    });

    return client;
  }
}
