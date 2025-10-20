import { test, expect } from '@playwright/test';
import { CreateUser } from '../pages/CreateUser';
import { generateRandomPayload } from '../utils/GenerateRandomPayload';
import { validateSchema } from '../utils/SchemaValidate';
import testData from '../data/testData.json';

test.describe('CreateUser', () => {

  //let name: string;
 // let job: string;

  /*test.beforeAll(() => {

    const user = generateRandomPayload();
    name = user.name;
    job = user.job;


  });

  */
  test('Create User', async ({ request }) => {
    const createUser = new CreateUser(request);
    const response = await createUser.createUser(testData.createUser.inputData.name, testData.createUser.inputData.job);
    const responseBody = await response.json();
    expect(response.status()).toBe(testData.createUser.expectedStatus);

    expect(responseBody.name).toBe(testData.createUser.expectedData.name);

    const isValid = validateSchema('CreateUserSchema.json', responseBody);
    expect(isValid).toBe(true);
  });
});
