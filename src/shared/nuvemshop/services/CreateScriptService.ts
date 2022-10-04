import 'dotenv/config';

import createAxiosInstance from '../../../config/AxiosNuvem';
import { isNuvemError, NuvemError, sendAppError } from '../isError';

interface IResponse {
  id: number;
  event: string;
  src: string;
  where: string;
  created_at: string;
  updated_at: string;
  code: number;
  message: string;
  description: string;
}

type NuvemReturn = IResponse | NuvemError;

export default class CreateScriptService {
  public async execute(
    nuvemShopIdStore: number,
    nuvemShopStoreToken: string,
    src: string,
  ): Promise<IResponse> {
    const baseUrl = `https://api.nuvemshop.com.br/v1/${nuvemShopIdStore}`;
    const httpClient = createAxiosInstance(nuvemShopStoreToken, baseUrl);
    const response = await httpClient.post<NuvemReturn>(`/scripts`, {
      event: 'onload',
      src,
      where: 'store',
    });

    if (isNuvemError(response.data)) {
      throw sendAppError(response.data);
    }

    return response.data;
  }
}
