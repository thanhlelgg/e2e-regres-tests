import axios, { AxiosInstance } from 'axios';
import { BaseAPI } from '../../../base/BaseAPI';

export abstract class BaseRegresAPI extends BaseAPI {
  private _axios: AxiosInstance;
  private static API_HOST = 'https://reqres.in/api/';

  constructor(path: string) {
    super(BaseRegresAPI.API_HOST + path);
    this._axios = axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.configInterceptors(this._axios);
  }

  get axios(): AxiosInstance {
    return this._axios;
  }
}
