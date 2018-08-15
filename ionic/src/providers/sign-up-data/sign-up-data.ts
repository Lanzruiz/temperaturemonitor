import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SignUpDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignUpDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SignUpDataProvider Provider');
  }

  getEmail(){
    console.log("test");
  }

}
