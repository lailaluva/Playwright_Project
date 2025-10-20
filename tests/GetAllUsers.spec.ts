import { test, expect } from '@playwright/test';
import { GetAllUsers } from '../pages/GetAllUsers';
import { validateSchema } from '../utils/SchemaValidate';
import testData from '../data/testData.json';


test('Get all user data', async ({ request }) => {
    const getAllUsers = new GetAllUsers(request);
    const response = await getAllUsers.getAllUsers();

    expect(response.status()).toBe(testData.getListOfUsers.expectedStatus);

    const responseBody = await response.json();
    console.log('Get All Users Response:', responseBody);

    // Verify the response has expectedPage property
    expect(responseBody).toHaveProperty('page');
    // Verify data is an array and not empty
    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBeGreaterThan(0);
    // Verify each user in data array has an id
    responseBody.data.forEach((user:any) => {
        expect(user).toHaveProperty('id');
    });

    expect(responseBody.data[0].first_name).toContain(testData.getListOfUsers.expectedData[0].first_name);

     const isValid = validateSchema('GetAllUsersSchema.json', responseBody)
        expect(isValid).toBe(true);
    });