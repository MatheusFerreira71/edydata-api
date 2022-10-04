import { Request, Response } from 'express';
import ActivateScriptService from '../../../../../shared/nuvemshop/services/ActivateScriptService';
import ActivateWebhooksService from '../../../../../shared/nuvemshop/services/ActivateWebhooksService';
import DeactivateScriptService from '../../../../../shared/nuvemshop/services/DeactivateScriptService';
import DeactivateWebhooksService from '../../../../../shared/nuvemshop/services/DeactivateWebhooksService';
import CreateStoreService from '../../../services/CreateStoreService';
import DeleteStoreservice from '../../../services/DeleteStoreService';
import FindAllStoresService from '../../../services/FindAllStoresService';
import FindOneStoreService from '../../../services/FindOneStoreService';
import FindStoreService from '../../../services/FindStoreService';
import UninstallAppStoreService from '../../../services/UninstallAppStoreService';
import UpdateStoreService from '../../../services/UpdateStoreService';
import StoreRepository from '../../database/repositories/StoreRepository';

export default class StoreController {
  public async create(req: Request, res: Response): Promise<Response> {
    const storeRepository = new StoreRepository();

    const { code } = req.query;

    const createStore = new CreateStoreService(storeRepository);

    const store = await createStore.execute(String(code));

    return res.status(200).render('index', { email: store.nuvemshop_email });
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const storeRepository = new StoreRepository();

    const { offset, limit, search } = req.query;

    if (search) {
      const findStores = new FindStoreService(storeRepository);

      const stores = await findStores.execute(
        String(search),
        Number(offset),
        Number(limit),
      );

      return res.json(stores);
    }

    const findAllStores = new FindAllStoresService(storeRepository);

    const stores = await findAllStores.execute(Number(offset), Number(limit));

    return res.json(stores);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const storeRepository = new StoreRepository();

    const { id } = req.params;

    const findOneStore = new FindOneStoreService(storeRepository);

    const store = await findOneStore.execute(Number(id));

    return res.json(store);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const storeRepository = new StoreRepository();

    const { id, name, contact_email, nuvemshop_email, nuvemshop_domain } =
      req.body;

    const updateStore = new UpdateStoreService(storeRepository);

    const store = await updateStore.execute(id, {
      name,
      contact_email,
      nuvemshop_email,
      nuvemshop_domain,
    });

    return res.json(store);
  }

  public async uninstall(req: Request, res: Response): Promise<Response> {
    const storeRepository = new StoreRepository();

    const { store_id } = req.body;

    const uninstallApp = new UninstallAppStoreService(storeRepository);

    const store = await uninstallApp.execute(store_id);

    return res.json(store);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const storeRepository = new StoreRepository();

    const { id } = req.params;

    const deleteStore = new DeleteStoreservice(storeRepository);

    const store = await deleteStore.execute(Number(id));

    return res.json(store);
  }

  public async activate(req: Request, res: Response): Promise<Response> {
    const { nuvemShopIdStore, nuvemShopStoreToken } = req.body;

    const storeRepository = new StoreRepository();

    const activateScriptServ = new ActivateScriptService(storeRepository);
    const activateWebhooksServ = new ActivateWebhooksService(storeRepository);

    const scriptMessage = await activateScriptServ.execute(
      nuvemShopIdStore,
      nuvemShopStoreToken,
    );

    const webhooksMessage = await activateWebhooksServ.execute(
      nuvemShopIdStore,
      nuvemShopStoreToken,
    );

    return res.json(`${scriptMessage} e ${webhooksMessage}`);
  }

  public async deactivate(req: Request, res: Response): Promise<Response> {
    const { nuvemShopIdStore, nuvemShopStoreToken } = req.body;

    const storeRepository = new StoreRepository();

    const deactivateScriptServ = new DeactivateScriptService(storeRepository);
    const deactivateWebhooksServ = new DeactivateWebhooksService(
      storeRepository,
    );

    const scriptMessage = await deactivateScriptServ.execute(
      nuvemShopIdStore,
      nuvemShopStoreToken,
    );

    const webhooksMessage = await deactivateWebhooksServ.execute(
      nuvemShopIdStore,
      nuvemShopStoreToken,
    );

    return res.json(`${scriptMessage} e ${webhooksMessage}`);
  }
}
