import { Client } from '@prisma/client';
import IClientRepository from '../repositories/IClientRepository';

export default class FindClientsByNameService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(name: string): Promise<Client[]> {
    const clients = await this.clientRepo.findByName(name);

    return clients;
  }
}
