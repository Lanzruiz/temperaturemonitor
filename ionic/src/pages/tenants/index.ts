import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddTenantPage } from '../tenants/add/index';
import { EditTenantPage } from '../tenants/edit/index';

@Component({
  selector: 'page-tenants',
  templateUrl: 'index.html'
})
export class TenantsPage {

  members: any;

  members_list = [
    {
      name: 'Warwick',
      email: 'info@warwick.com',
      version: '3.0.1555',
      size: '32mb',
      color: 'pink'
    },
    {
      name: 'NHS Trust',
      email: 'info@nhstrust.com',
      version: '3.0.1555',
      size: '32mb',
      color: 'darkblue'
    },
    {
      name: 'Monika',
      email: 'info@worcessterollege.com',
      version: '3.0.1555',
      size: '32mb',
      color: 'darkblue'
    },
    {
      name: 'Worcesster College',
      email: 'info@worcessterollege.com',
      version: '3.0.1555',
      size: '32mb',
      color: 'pink'
    },
    {
      name: 'NHS Trust',
      email: 'info@nhstrust.com',
      version: '3.0.1555',
      size: '32mb',
      color: 'pink'
    },
    {
      name: 'Warwick',
      email: 'info@warwick.com',
      version: '3.0.1555',
      size: '32mb',
      color: 'pink'
    },
    {
      name: 'NHS Trust',
      email: 'info@nhstrust.com',
      version: '3.0.1555',
      size: '32mb',
      color: 'darkblue'
    },
    {
      name: 'Monika',
      email: 'info@monika.com',
      version: '3.0.1555',
      size: '500mb',
      color: 'red'
    }
  ];

  shouldShowControls: boolean;
  listIndex: number;

  constructor(public navCtrl: NavController) {
    this.members = this.members_list;;
  }

  showControls(key){

    this.shouldShowControls = this.shouldShowControls === true ? false : true;

    this.listIndex = key;
  }


  onAddTenant(){
    this.navCtrl.push(AddTenantPage);
  }

  onEditTenant() {
    this.navCtrl.push(EditTenantPage);
  }

}
