import axios from 'axios';
import AppError from '../../../shared/errors/AppError';
import IStoreRepository from '../repositories/IStoreRepository';

const app_name = process.env.APP_NAME;

export default class DeleteStoreService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(id: number): Promise<string> {
    const checkStoreExist = await this.storeRepository.findById(id);

    if (!checkStoreExist) {
      throw new AppError('ERRO: Nenhuma loja foi encontrada.', 404);
    }

    await axios
      .post('https://www.eva-system-api.plataformaeva.com/unbind-app-store', {
        nuvemshop_id_store: checkStoreExist.nuvemshop_store_id,
        app_name,
      })
      .catch(err => {
        throw new AppError(`ERRO: ${err}`, 400);
      });

    const store = await this.storeRepository.delete(id);

    return store;
  }
}
