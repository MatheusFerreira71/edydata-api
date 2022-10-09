import { Client } from '@prisma/client';
import IClientRepository from '../repositories/IClientRepository';

export default class FindClientsByBirthDateService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(startDate: Date, endDate: Date): Promise<Client[]> {
    const clients = await this.clientRepo.findByBirthDateRage(
      startDate,
      endDate,
    );

    return clients;
  }
}
