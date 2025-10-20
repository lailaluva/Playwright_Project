import { BasePage } from "./BasePage";
import logger from "../utils/logger";
import fs from 'fs';
import path from 'path';

export class CreateUser extends BasePage {

    testData: any;
        
    testFilePath = path.join(__dirname, '../data/testData.json');


    async createUser(name: string, job: string) {

        try {

            this.testData = JSON.parse(fs.readFileSync(this.testFilePath, 'utf-8'));
            const payload = { name, job };
            logger.info(`Creating user with payload: ${JSON.stringify(payload)}`);
            const response = await this.request.post(`${this.testData.baseUrl}${this.testData.createUser.endpoint}`, {
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'reqres-free-v1'
                },

            });
            const responseText = await response.text();
            if (!response.ok()) {
                logger.error(`CreateUser API failed for user ${name}. Status: ${response.status()}, Response: ${responseText}`);
            } else {
                logger.info(`CreateUser successful. Response: ${responseText}`);
            }
            return response;
        } catch (error) {
            logger.error(`Create user request failed: ${error}`);
            throw error;
        }

    }
}