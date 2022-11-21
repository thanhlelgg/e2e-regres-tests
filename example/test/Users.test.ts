import { assert, use } from 'chai';
import { test, suite } from '@testdeck/mocha';
import { AbstractListener } from '../base/AbstractListener';
import ChaiJsonSchema from 'chai-json-schema';
import { allure } from 'allure-mocha/runtime';
import { Users } from '../actions/api-requests/regres/Users';
import { data } from 'allure-decorators';
import schema from '../resource/schemas/get-user-response.json';
import { CommonHelpers } from '../common/helpers/CommonHelpers';

use(ChaiJsonSchema);

const correctUserId = [1, 2, 3];

const unavailableUserId = ['20', '0', 'abc'];

const randomUserId = ['1', 'abc', '0'];

const userBody = [
  {
    description: 'Normal body',
    body: {
      first_name: 'morpheus',
      job: 'leader',
      last_name: '',
    },
    updateId: '2',
  },
  {
    description: 'Body with number',
    body: {
      name: 'neo',
      job: 'the chosen one',
      age: 28,
    },
    updateId: 'abc',
  },
  {
    description: 'Empty body',
    body: {},
    updateId: '0',
  },
];

@suite('api/users route tests')
class UserAPIsTests extends AbstractListener {
  @data(correctUserId)
  @data.naming((testData) => `Verify get user successfully with user id: ${testData}`)
  @test('TC_01_GetSingleUserSuccessfully')
  async GetAvailableUser(testData: any): Promise<void> {
    allure.logStep(`Get User with id ${testData}`);
    let response = await Users.getInstance().getUser(testData);

    allure.logStep(`Verify Response is returned correctly`);
    this.verifyResponse(response, 200, schema.GetUserResponse);

    allure.logStep(`Verify response user id matches inputted id`);
    assert.deepEqual(response.data.data.id, testData, `User id is not returned correctly`);
  }

  @data(unavailableUserId)
  @data.naming((testData) => `Verify get user unsuccessfully with user id: ${testData}`)
  @test('TC_02_GetSingleUserNotFound')
  async GetUnavailableUser(testData: any): Promise<void> {
    allure.logStep(`Get User with id ${testData}`);
    let response = await Users.getInstance().getUser(testData);

    allure.logStep(`Verify Response is returned correctly`);
    this.verifyResponse(response, 404);

    allure.logStep(`Verify response body is empty`);
    assert.deepEqual(response.data, {}, `Response body is not returned correctly`);
  }

  @data(userBody)
  @data.naming((testData) => `Create User with ${testData.description}`)
  @test('TC_03_CreateNewUserSuccess')
  async CreateNewUser(testData: any): Promise<void> {
    allure.logStep(`Create new User with ${testData.description}`);
    let response = await Users.getInstance().createUser(testData.body);

    allure.logStep(`Verify Response code is returned correctly`);
    this.verifyResponse(response, 201);

    allure.logStep(`Build expected response`);
    let expectedResponseBody = CommonHelpers.copyObject(testData.body);
    expectedResponseBody.id = response.data.id;
    expectedResponseBody.createdAt = response.data.createdAt;

    allure.logStep(`Verify Response code is returned correctly`);
    assert.deepEqual(response.data, expectedResponseBody, `Response is not returned correctly`);
  }

  @data(userBody)
  @data.naming((testData) => `Update User with ${testData.description}`)
  @test('TC_04_UpdateUserSuccess')
  async UpdateUser(testData: any): Promise<void> {
    allure.logStep(`Create new User with ${testData.description}`);
    let response = await Users.getInstance().updateUser(testData.body, testData.updateId);

    allure.logStep(`Verify Response code is returned correctly`);
    this.verifyResponse(response, 200);

    allure.logStep(`Build expected response`);
    let expectedResponseBody = CommonHelpers.copyObject(testData.body);
    expectedResponseBody.updatedAt = response.data.updatedAt;

    allure.logStep(`Verify Response code is returned correctly`);
    assert.deepEqual(response.data, expectedResponseBody, `Response is not returned correctly`);
  }

  @data(randomUserId)
  @data.naming((testData) => `Verify remove user successfully with user id: ${testData}`)
  @test('TC_05_RemoveUserSuccess')
  async RemoveUser(testData: any): Promise<void> {
    allure.logStep(`Get User with id ${testData}`);
    let response = await Users.getInstance().deleteUser(testData);

    allure.logStep(`Verify Response is returned correctly`);
    this.verifyResponse(response, 204);

    allure.logStep(`Verify response body is empty`);
    assert.deepEqual(response.data, '', `Response body is not returned correctly`);
  }
}
