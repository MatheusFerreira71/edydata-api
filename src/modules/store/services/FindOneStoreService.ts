import { Store } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IStoreRepository from '../repositories/IStoreRepository';

export default class FindOneStoreService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(id: number): Promise<Store> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError('ERRO: Nenhuma loja foi encontrada.', 404);
    }

    return store;
  }
}
