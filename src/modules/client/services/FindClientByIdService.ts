import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

export default class FindClientByIdService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(id: number): Promise<Client> {
    const client = await this.clientRepo.findById(id);

    if (!client) {
      throw new AppError('Cliente não encontrado', 404);
    }

    return client;
  }
}
