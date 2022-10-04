import createAxiosInstance from '../../../config/AxiosNuvem';
import { NuvemError, isNuvemError, sendAppError } from '../isError';

interface IResponse {
  id: number;
  event: string;
  url: string;
  created_at: string;
  updated_at: string;
}

type NuvemReturn = IResponse | NuvemError;
export default class CreateWebhookService {
  public async execute(
    nuvemShopIdStore: number,
    nuvemShopStoreToken: string,
    event: string,
    url: string,
  ): Promise<IResponse> {
    const baseUrl = `https://api.nuvemshop.com.br/v1/${nuvemShopIdStore}`;
    const httpClient = createAxiosInstance(nuvemShopStoreToken, baseUrl);
    const response = await httpClient.post<NuvemReturn>(`/webhooks`, {
      event,
      url,
    });

    if (isNuvemError(response.data)) {
      throw sendAppError(response.data);
    }

    return response.data;
  }
}
