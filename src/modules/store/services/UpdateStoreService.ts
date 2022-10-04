import { Store } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IUpdateStoreDTO from '../dtos/IUpdateStoreDTO';
import IStoreRepository from '../repositories/IStoreRepository';

export default class UpdateStoreService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(
    id: number,
    { name, contact_email, nuvemshop_email, nuvemshop_domain }: IUpdateStoreDTO,
  ): Promise<Store> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError('ERRO: Nenhuma loja foi encontrada.', 404);
    }

    if (nuvemshop_email) {
      const checkStoreEmailExist = await this.storeRepository.findByNuvemEmail(
        nuvemshop_email,
      );

      if (checkStoreEmailExist && nuvemshop_email !== store.nuvemshop_email) {
        throw new AppError(
          'ERRO: o endereço de e-mail já esta sendo utilizado.',
          409,
        );
      }
    }

    const updatedStore = await this.storeRepository.update(id, {
      name,
      contact_email,
      nuvemshop_email,
      nuvemshop_domain,
    });

    return updatedStore;
  }
}
