import { Client } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IClientRepository from '../repositories/IClientRepository';

export default class FindClientsByNameService {
  constructor(private clientRepo: IClientRepository) {
    this.clientRepo = clientRepo;
  }

  public async execute(
    offset: number,
    limit: number,
    name: string,
  ): Promise<[Client[], number]> {
    const clients = await this.clientRepo.findByName(offset, limit, name);

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
