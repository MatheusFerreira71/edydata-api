// import { Client } from '@prisma/client';
// import AppError from '../../../shared/errors/AppError';
import AppError from '../../../shared/errors/AppError';
import ICountAndSalaryDTO from '../dtos/ICountAndSalaryDTO';
import IGroupFilterKeys from '../keys/IGroupFilterKeys';
import IClientRepository from '../repositories/IClientRepository';

export default class FindCountAndTotalSalaryService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(
    offset: number,
    limit: number,
    field: IGroupFilterKeys,
  ): Promise<[ICountAndSalaryDTO, number]> {
    const clients = await this.clientRepo.findCountAndTotalSalary(
      offset,
      limit,
      field,
    );

    if (!clients[0].length) {
      throw new AppError('Nenhum cliente foi encontrado.', 404);
    }

    const totalPage =
      clients[1] % limit === 0
        ? clients[1] / limit
        : parseInt(`${clients[1] / limit}`, 10) + 1;

    return [clients[0], totalPage];
  }
}
