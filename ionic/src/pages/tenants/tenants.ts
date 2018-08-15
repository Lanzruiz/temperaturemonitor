import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ListMasterPage } from '../pages';
import { ProfilePage }  from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Menuv2Page } from '../pages';

/**
 * Generated class for the TenantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tenants',
  templateUrl: 'tenants.html',
})
export class TenantsPage {

  tab1Root: any = ListMasterPage;
  tab2Root: any = ProfilePage;
  tab5Root: any = Menuv2Page;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TdashboardPage');
  }

}
