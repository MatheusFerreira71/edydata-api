import createAxiosInstance from '../../../config/AxiosNuvem';
import { isNuvemError, NuvemError, sendAppError } from '../isError';

interface IResponse {
  id: number;
  name: {
    pt: string;
  };
  description: {
    pt: string;
  };
  type: string;
  email: string;
  logo: string;
  contact_email: string;
  country: string;
  facebook: string;
  twitter: string;
  instagram: string;
  pinterest: string;
  blog: string;
  business_id: string;
  business_name: string;
  business_address: string;
  address: string;
  phone: string;
  customer_accounts: string;
  plan_name: string;
  domains: [string];
  languages: {
    es: {
      currency: string;
      active: boolean;
    };
    pt: {
      currency: string;
      active: boolean;
    };
    en: {
      currency: string;
      active: boolean;
    };
  };
  original_domain: string;
  url_with_protocol: string;
  main_currency: string;
  current_theme: string;
  main_language: string;
  admin_language: string;
  created_at: string;
  updated_at: string;
  code: number;
  message: string;
}

type NuvemReturn = IResponse | NuvemError;
export default class FindStoreService {
  public async execute(
    nuvemShopIdStore: number,
    nuvemShopStoreToken: string,
  ): Promise<IResponse> {
    const httpClient = createAxiosInstance(
      nuvemShopStoreToken,
      `https://api.nuvemshop.com.br/v1/${nuvemShopIdStore}`,
    );

    const response = await httpClient.get<NuvemReturn>(`/store`);

    if (isNuvemError(response.data)) {
      throw sendAppError(response.data);
    }

    return response.data;
  }
}
