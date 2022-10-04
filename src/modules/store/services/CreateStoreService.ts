import { Store } from '@prisma/client';
import axios from 'axios';
import AppError from '../../../shared/errors/AppError';
import CreateScriptService from '../../../shared/nuvemshop/services/CreateScriptService';
import FindAllScriptsService from '../../../shared/nuvemshop/services/FindAllScriptsService';
import FindStoreService from '../../../shared/nuvemshop/services/FindStoreService';
import ValidateAppTokenService from '../../../shared/nuvemshop/services/ValidateAppTokenService';
import IUpdateStoreDTO from '../dtos/IUpdateStoreDTO';
import IStoreRepository from '../repositories/IStoreRepository';

const apiUrl = process.env.API_URL;
const app_name = process.env.APP_NAME;

export default class CreateStoreService {
  private storeRepository: IStoreRepository;

  constructor(storeRepository: IStoreRepository) {
    this.storeRepository = storeRepository;
  }

  public async execute(code: string): Promise<Store> {
    const validateToken = new ValidateAppTokenService();

    const data = await validateToken.execute(code);

    if (data.error) {
      throw new AppError('ERRO: A validação do token falhou.', 400);
    }

    const nuvemshop_store_id = data.user_id;
    const nuvemshop_store_token = data.access_token;

    const findStore = new FindStoreService();

    const storeData = await findStore.execute(
      nuvemshop_store_id,
      nuvemshop_store_token,
    );

    if (storeData.code) {
      throw new AppError(
        `ERRO: ${storeData.message}; ${storeData.description}`,
        storeData.code,
      );
    }

    const { contact_email, phone } = storeData;
    const name = storeData.name.pt;
    const nuvemshop_email = storeData.email;
    const nuvemshop_domain = storeData.original_domain;

    const findScripts = new FindAllScriptsService();

    const scripts = await findScripts.execute(
      nuvemshop_store_id,
      nuvemshop_store_token,
    );

    const srcScript = `${apiUrl}/js/api-padrao-external.js`;

    let script = scripts.find(x => x.src === srcScript);

    if (!script) {
      const createScript = new CreateScriptService();
      script = await createScript.execute(
        nuvemshop_store_id,
        nuvemshop_store_token,
        srcScript,
      );
    }

    // const findWebhook = new FindAllWebhooksService();

    // const webhooks = await findWebhook.execute(
    //   nuvemshop_store_id,
    //   nuvemshop_store_token,
    // );

    // let webhooksIds = [];
    // if (webhooks.lenght > 0) {
    //   webhooksIds = webhooks.map(webhook => String(webhook.id));
    // }

    // const urlWebhook = `${apiUrl}/uninstall`;

    // let webhook = webhooks.find(x => x.url === urlWebhook);

    // if (!webhook) {
    //   const createWebhook = new CreateWebhookService();
    //   webhook = await createWebhook.execute(
    //     nuvemshop_store_id,
    //     nuvemshop_store_token,
    //     'app/uninstalled',
    //     urlWebhook,
    //   );
    // }

    let store = await this.storeRepository.findByStoreId(nuvemshop_store_id);

    if (store) {
      const updateData: IUpdateStoreDTO = {
        name,
        nuvemshop_store_id,
        nuvemshop_store_token,
        nuvemshop_script_id: script.id,
        contact_email,
        // nuvemshop_webhooks_id: webhooksIds.join(','),
        nuvemshop_domain,
      };

      store = await this.storeRepository.update(store.id, updateData);
    } else {
      store = await this.storeRepository.create({
        name,
        nuvemshop_store_id,
        nuvemshop_store_token,
        nuvemshop_script_id: script.id,
        contact_email,
        nuvemshop_email,
        // nuvemshop_id_webhooks: webhooksIds.join(',');
        nuvemshop_domain,
      });
    }

    await axios
      .post('https://www.eva-system-api.plataformaeva.com/relates-app-store', {
        nuvemshop_id_store: nuvemshop_store_id,
        app_name,
        owner_email: nuvemshop_email,
        owner_name: name,
        owner_phone: phone || undefined,
        owner_domain: nuvemshop_domain,
      })
      .catch(err => {
        throw new AppError(`ERRO: ${err}`, 400);
      });

    return store;
  }
}
