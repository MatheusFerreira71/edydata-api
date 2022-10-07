import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import ICreateClientDTO from '../dtos/ICreateClientDTO';
import IClientRepository from '../repositories/IClientRepository';

export default class CreateClientService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(data: ICreateClientDTO): Promise<Client> {
    const client = await this.clientRepo.create(data).catch(err => {
      throw new AppError(`${err}`);
    });

    return client;
  }
}
