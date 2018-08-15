import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComingPage } from '../pages';

import { ProfilePage }  from '../pages';
import { Menuv2Page } from '../pages'
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Tab5Root } from '../pages';
import { TaskPage } from '../pages';


/**
 * Generated class for the TenantdashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tenantdashboard',
  templateUrl: 'tenantdashboard.html',
})
export class TenantdashboardPage {

  tab1Root: any = TaskPage;
  tab2Root: any = ProfilePage;
  tab5Root: any = Menuv2Page;


  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TenantdashboardPage');
  }

}
