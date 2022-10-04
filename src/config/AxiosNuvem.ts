import axios, { AxiosInstance } from 'axios';

export default function createAxiosInstance(
  token: string,
  url: string,
  userAgent = '',
): AxiosInstance {
  const api = axios.create({
    baseURL: url,
    proxy: false,
  });
  api.interceptors.request.use(config => {
    config.headers.authentication = `bearer ${token}`;
    config.headers.contentType = 'application/json';
    config.headers.UserAgent = userAgent;
    return config;
  });
  api.interceptors.response.use(
    res => res,
    err => {
      return {
        data: err.response.data,
      };
    },
  );

  return api;
}
