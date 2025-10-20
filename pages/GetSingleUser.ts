import { BasePage } from "./BasePage";
//import user_cred from "../data/user_cred.json";
import logger from '../utils/logger';
import fs from 'fs';
import path from 'path';

export class GetSingleUser extends BasePage {

     testData: any;

    testFilePath = path.join(__dirname, '../data/testData.json');




    async getSingleUser(userId: string) {
        try {
            this.testData = JSON.parse(fs.readFileSync(this.testFilePath, 'utf-8'));
            //logger.info(`Fetching user with ID: ${user_cred.id}`);
            const response = await this.request.get(`${this.testData.baseUrl}${this.testData.getSingleUser.endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'reqres-free-v1'
                }
            });
            const responseText = await response.text();
            if (!response.ok()) {
                logger.error(`Get single user API failed. Status: ${response.status()}, Response: ${responseText}`);
            } else {
                logger.info(`Get single user successful. Response: ${responseText}`);
            }
            return response;
        } catch (error) {
            logger.error(`Get single user request failed: ${error}`);
            throw error;
        }
    }
}
