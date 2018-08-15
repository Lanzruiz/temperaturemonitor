import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComingPage } from '../pages';
import { CasePage } from '../pages';
import { TaskPage } from '../pages';
import { RolePage } from '../pages';
import { ListMasterPage } from '../pages';

/**
 * Generated class for the Menuv2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menuv2',
  templateUrl: 'menuv2.html',
})
export class Menuv2Page {

  componentName: string;

  items = [
    {name:'Sites', component: 'SitesPage'},
    {name:'Cases', component: 'CasePage'},
    {name:'Reports', component: 'ReportsPage'},
    {name:'Graphs', component: 'GraphsPage'},
    {name:'Tenants', component: 'ListMasterPage'},
    {name:'Users', component: 'UsersPage'},
    {name:'Roles', component: 'RolePage'}
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
