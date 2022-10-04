import createAxiosInstance from '../../../config/AxiosNuvem';
import { isNuvemError, NuvemError, sendAppError } from '../isError';

interface IResponse {
  id: number;
  event: string;
  src: string;
  where: string;
  created_at: string;
  updated_at: string;
}

type NuvemReturn = IResponse[] | NuvemError;
export default class FindAllScriptsService {
  public async execute(
    nuvemShopIdStore: number,
    nuvemShopStoreToken: string,
  ): Promise<IResponse[]> {
    const httpClient = createAxiosInstance(
      nuvemShopStoreToken,
      `https://api.nuvemshop.com.br/v1/${nuvemShopIdStore}`,
    );

    const response = await httpClient.get<NuvemReturn>(`/scripts`);

    if (isNuvemError(response.data)) {
      throw sendAppError(response.data);
    }

    return response.data;
  }
}
