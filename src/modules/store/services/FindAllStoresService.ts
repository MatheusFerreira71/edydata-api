import { Store } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IStoreRepository from '../repositories/IStoreRepository';

export default class FindAllStoresService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(
    offset: number,
    limit: number,
  ): Promise<[Store[], number]> {
    const stores = await this.storeRepository.findAll(offset, limit);

    if (!stores[0]?.length) {
      throw new AppError('ERRO: Nenhuma loja foi encontrada.', 404);
    }

    const totalPage =
      stores[1] % limit === 0
        ? stores[1] / limit
        : parseInt(`${stores[1] / limit}`, 10) + 1;

    return [stores[0], totalPage];
  }
}
