import logger from '../utils/logger';
import { BasePage } from "./BasePage";
import fs from 'fs';
import path from 'path';


export class GetAllUsers extends BasePage {


       testData: any;
    
        testFilePath = path.join(__dirname, '../data/testData.json');
    
    async getAllUsers() {
        try {
            this.testData = JSON.parse(fs.readFileSync(this.testFilePath, 'utf-8'));
            logger.info(`Fetching all users`);
            const response = await this.request.get(`${this.testData.baseUrl}${this.testData.getListOfUsers.endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'reqres-free-v1'
                }
            });
            const responseText = await response.text();
            if (!response.ok()) {
                logger.error(`Get all users API failed. Status: ${response.status()}, Response: ${responseText}`);
            } else {
                logger.info(`Get all users successful. Response: ${responseText}`);
            }
            return response;
        } catch (error) {
            logger.error(`Get all users request failed: ${error}`);
            throw error;
        }
    }
}

         

    
