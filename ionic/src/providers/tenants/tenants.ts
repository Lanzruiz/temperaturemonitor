import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/app.config';

@Injectable()
export class TenantsProvider {


  url = this.appConfig.monikaApiBaseUrl + "/tenant";

  constructor(public http: HttpClient, public appConfig: AppConfig) {
    console.log('Hello TenantsProvider Provider');
  }

  getTenants() {
    var data = {
    "tenantListFilterQuery": {},
    "tenantListSortQuery": {
    "sortBy": []
      }
    };
    return this.http.post(this.url+`/list`,data)
	    .map((res:Response) => res);
  }

  addTenant(tenant) {
    console.log(tenant);
    var data = {
      "name": tenant.name,
      "legalName": tenant.legalName,
      "email": tenant.email,
      "phone": tenant.phone,
      "address": tenant.address,
      "city": tenant.city,
      "country": tenant.country,
      "subdomain": tenant.subdomain,
      "status": "active",
      "profilePic" : tenant.profilePic
    }
    return this.http.post(this.url,data)
      .map((res:Response) => res);
  }
  editTenant(id,params) {
    console.log('ID:', id);
    console.log(params);
    return this.http.patch(this.url+`/`+id,params)
      .map((res:Response) => res);
  }

  deleteTenant(id) {
    return this.http.delete(this.url+`/`+id)
      .map((res:Response) => res);
  }

  changeStatus(tenant) {
    console.log(tenant);
    var api = tenant.id+'/activate';
    if(tenant.status == 'active')
      api = tenant.id+'/deactivate';
     return this.http.patch(this.url+`/`+api,{})
      .map((res:Response) => res);
    
  }

}
