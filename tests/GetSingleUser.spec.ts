import { test, expect } from '@playwright/test';
import { GetSingleUser } from "../pages/GetSingleUser"; 
//import user_cred from "../data/user_cred.json";
import testData from '../data/testData.json';
import { validateSchema } from '../utils/SchemaValidate';

test('Get single user data', async ({ request }) => {
    const getSingleUser = new GetSingleUser(request);

    const response = await getSingleUser.getSingleUser(testData.getSingleUser.expectedData.id);
    const responseBody = await response.json();
    console.log('Get Single User Response:', responseBody);
    expect(response.status()).toBe(testData.getSingleUser.expectedStatus);    

    expect(responseBody.data).toHaveProperty('email');
    expect(responseBody.data.email).toContain(testData.getSingleUser.expectedData.email);

    const isValid = validateSchema('GetSingleUserSchema.json', responseBody);
    expect(isValid).toBe(true);
});