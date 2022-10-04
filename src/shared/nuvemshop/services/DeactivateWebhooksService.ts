import createAxiosInstance from '../../../config/AxiosNuvem';
import IStoreRepository from '../../../modules/store/repositories/IStoreRepository';
import AppError from '../../errors/AppError';
import { isNuvemError, NuvemError, sendAppError } from '../isError';

interface Webhook {
  created_at: Date;
  event: string;
  id: number;
  url: string;
  updated_at: Date;
}

type NuvemReturn = Webhook | undefined | NuvemError;
export default class DeactivateWebhooksService {
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

    if (store.nuvemshop_webhooks_id) {
      const webhooksIds = store.nuvemshop_webhooks_id.split(',');

      const baseUrl = `https://api.nuvemshop.com.br/v1/${nuvemShopIdStore}`;
      const httpClient = createAxiosInstance(nuvemShopStoreToken, baseUrl);

      const webhookPromises = webhooksIds.map(webhookId => {
        return httpClient.get<NuvemReturn>(`/webhooks/${webhookId}`);
      });

      const webhooks = await Promise.all(webhookPromises);

      const updatedWebhooksPromises = webhooks.map(webhook => {
        if (!webhook.data) {
          throw new AppError('ERRO: Webhook não encontrado', 404);
        }

        if (isNuvemError(webhook.data)) {
          throw sendAppError(webhook.data);
        }

        webhook.data.url = `${webhook.data.url}/desativado`;

        return httpClient.put(`/webhooks/${webhook.data.id}`, webhook.data);
      });

      await Promise.all(updatedWebhooksPromises);
    }

    return 'Webhooks desativados com sucesso';
  }
}
