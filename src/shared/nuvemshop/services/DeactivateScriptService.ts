import createAxiosInstance from '../../../config/AxiosNuvem';
import IStoreRepository from '../../../modules/store/repositories/IStoreRepository';
import AppError from '../../errors/AppError';
import { isNuvemError, NuvemError, sendAppError } from '../isError';

interface Script {
  created_at: Date;
  event: string;
  id: number;
  src: string;
  updated_at: Date;
  where: string;
}

type NuvemReturn = Script | undefined | NuvemError;
export default class DeactivateScriptService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(
    nuvemShopIdStore: number,
    nuvemShopStoreToken: string,
  ): Promise<string> {
    const store = await this.storeRepository.findByStoreId(nuvemShopIdStore);

    if (!store) {
      throw new AppError('ERRO: Nenhuma loja encontrada', 404);
    }

    const baseUrl = `https://api.nuvemshop.com.br/v1/${nuvemShopIdStore}`;
    const httpClient = createAxiosInstance(nuvemShopStoreToken, baseUrl);
    const script = await httpClient.get<NuvemReturn>(
      `/scripts/${store.nuvemshop_script_id}`,
    );

    if (!script.data) {
      throw new AppError('ERRO: Nenhum script encontrado', 404);
    }

    if (isNuvemError(script.data)) {
      throw sendAppError(script.data);
    }

    script.data.src = `${script.data.src}/desativado`;

    await httpClient.put(`/scripts/${store.nuvemshop_script_id}`, script.data);

    return 'Script desativado com sucesso';
  }
}
