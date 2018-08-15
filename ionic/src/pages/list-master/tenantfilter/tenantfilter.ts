import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TenantfilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tenantfilter',
  templateUrl: 'tenantfilter.html',
})
export class TenantfilterPage {

   componentName: string;

  items = [
    {name:'Sort', component: 'SitesPage'},
    {name:'Filter', component: 'CasePage'}
  ];

 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Menuv2Page');
  }

  itemSelected(item: string) {

    //component = item.component;
    console.log("Selected Item", item);
    this.navCtrl.push(item);
  }

}
