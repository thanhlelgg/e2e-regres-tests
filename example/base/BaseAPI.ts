import axios, { AxiosInstance } from 'axios';
import { allure } from 'allure-mocha/runtime';
import { ContentType } from 'allure-js-commons';

export abstract class BaseAPI {
  url: string;
  private static configureFlag = false;

  constructor(path: string) {
    this.url = path;
    this.configureDefaultAxios();
  }

  private configureDefaultAxios(): void {
    if (BaseAPI.configureFlag == true) {
      return;
    }
    axios.defaults.timeout = 20000;
    BaseAPI.configureFlag = true;
  }

  protected configInterceptors(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.request.use((request) => {
      this.attachLog('Request: ', JSON.stringify(request, null, 2), ContentType.JSON);
      return request;
    });
    axiosInstance.interceptors.response.use(
      (response) => {
        if (response.data === undefined) {
          throw Error(`Response data is not available. Response: \n${response}`);
        }
        this.attachLog('Success Response: ', JSON.stringify(response.data, null, 2), ContentType.JSON);
        return response;
      },
      (error) => {
        if (!error.response) {
          throw error;
        }
        this.attachLog('Failed Response: ', JSON.stringify(error.response.data, null, 2), ContentType.JSON);
        return error.response;
      }
    );
  }

  public addHeaderProperty(headerProperty: string, headerValue: string): void {
    axios.defaults.headers[headerProperty] = headerValue;
  }

  private attachLog(name: string, content: any, contentType: ContentType): void {
    try {
      allure.attachment(name, content, contentType);
    } catch (e) {
      allure.attachment(name, e.message, ContentType.TEXT);
    }
  }
}
