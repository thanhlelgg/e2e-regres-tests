import { allure, MochaAllure } from 'allure-mocha/runtime';
import { decorate } from 'allure-decorators';
import { assert, use } from 'chai';
import ChaiJsonSchema from 'chai-json-schema';
use(ChaiJsonSchema);

export abstract class AbstractListener {
  public static async before() {
    decorate<MochaAllure>(allure);
  }

  protected verifyResponse(response: any, responseCode: number, schema?: any): boolean {
    assert.equal(response.status, responseCode, 'Response code is not returned correctly');
    if (schema) {
      assert.jsonSchema(response.data.data, schema, 'Response does not match schema');
    }
    return true;
  }
}
