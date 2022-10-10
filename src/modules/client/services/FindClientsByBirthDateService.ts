import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

export default class FindClientsByBirthDateService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(startDate: Date, endDate: Date): Promise<Client[]> {
    if (startDate >= endDate) {
      throw new AppError(
        'A data de início não pode ser maior que a data de fim',
        409,
      );
    }

    const clients = await this.clientRepo.findByBirthDateRage(
      startDate,
      endDate,
    );

    return clients;
  }
}
