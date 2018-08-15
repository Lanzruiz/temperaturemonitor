import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { AppConfig } from '../../config/app.config';

@Injectable()
export class UsersProvider {

  users:any[];	

// <<<<<<< HEAD
//   //url = `https://monika-cloudplatform-api-qa.aptiture.com/api/v1/users`
//   url =`http://127.0.0.1:9000/api/v1/user`;
//   constructor(public http: HttpClient) {
// ======
  url = this.appConfig.monikaApiBaseUrl + "/user";
  constructor(public http: HttpClient, public appConfig: AppConfig) {
    console.log('Hello UsersProvider Provider');
  }


  getUsers() {
    var data = {
        "userListFilterQuery": {},
        "userListSortQuery": {}
      }
    return this.http.post(this.url+`/list`,data)
      .map((res:Response) => res);
  }

  addUser(user) {
    console.log(user);
     return this.http.post(this.url,user)
       .map((res:Response) => res);
  }


  editUser(id,params) {
    console.log('ID:', id);
    console.log(params);
    return this.http.patch(this.url+`/`+id,params)
      .map((res:Response) => res);
  }

  addPermission(userId, list) {
    console.log(userId);
    let parameter = [];
    for (let data of list) {
      parameter.push({
        'permissionTypeId' : data.permission_id,
        'tenantId' : 'fa8518a0-89df-11e8-9a94-a6cf71072f51',
        'regionId' : 'fa8518a0-89df-11e8-9a94-a6cf71072f52',
        'siteId' : 'fa8518a0-89df-11e8-9a94-a6cf71072f53'
      });
    }
    let newUrl = this.url + "/" + userId
    return this.http.post(newUrl+`/permission`,parameter)
      .map((res:Response) => res);

  }

  getUserPermissioTypes() {
    return this.http.get(this.url+`/permissionType/list`)
      .map((res:Response) => res);
  }

  

}

