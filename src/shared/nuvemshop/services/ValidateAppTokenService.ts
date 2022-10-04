import axios from 'axios';

import 'dotenv/config';

const appID = process.env.APP_ID;
const appSecret = process.env.APP_SECRET;

interface IResponse {
  access_token: string;
  token_type: string;
  scope: string;
  user_id: number;
  store_id: number;
  error?: string;
  error_description?: string;
}

export default class ValidateAppTokenService {
  public async execute(code: string): Promise<IResponse> {
    const baseUrl = 'https://www.tiendanube.com/apps/authorize/token/';

    const { data } = await axios.post(baseUrl, {
      client_id: appID,
      client_secret: appSecret,
      code,
      grant_type: 'authorization_code',
    });

    return data;
  }
}
