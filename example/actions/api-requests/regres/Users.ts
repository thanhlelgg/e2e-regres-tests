import { step } from 'allure-decorators';
import { BaseRegresAPI } from './BaseAPI';

export interface UpdatePOSDeliveryOrderPayload {
  delivery_status: string;
}

export class Users extends BaseRegresAPI {
  private static instance: Users;

  private constructor() {
    super('users');
  }

  static getInstance(): Users {
    if (!Users.instance) {
      Users.instance = new Users();
    }
    return Users.instance;
  }

  // @step('[GET] Get Single User')
  async getUser(userId: any): Promise<any> {
    return await this.axios.get(`${this.url}/${userId}`);
  }

  // @step('[POST] Create User')
  async createUser(userBody: any): Promise<any> {
    return await this.axios.post(`${this.url}`, userBody);
  }

  @step('[PATCH] Update User')
  async updateUser(userBody: any, userId: any): Promise<any> {
    return await this.axios.put(`${this.url}/${userId}`, userBody);
  }

  @step('[DELETE] Delete User')
  async deleteUser(userId: any): Promise<any> {
    return await this.axios.delete(`${this.url}/${userId}`);
  }
}
