import { Injectable } from '@angular/core';
declare var process: any;
@Injectable()
export class AppConfig {  

  public monikaApiBaseUrl: string;

  constructor() {
    this.monikaApiBaseUrl = process.env.MONIKA_API_BASE_URL;
    //this.monikaApiBaseUrl = `http://127.0.0.1:9000/api/v1`;
  }
}