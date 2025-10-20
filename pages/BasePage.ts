import { APIRequestContext } from '@playwright/test';

export class BasePage {
    //readonly basePage: string;
   readonly request: APIRequestContext;

    constructor( request: APIRequestContext) {
        //this.basePage = 'https://reqres.in/api';
        this.request = request;
    }


}


