import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TmainPage } from '../pages';
import { ProfilePage } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';
import { Menuv2Page } from '../pages'

/**
 * Generated class for the TdashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tdashboard',
  templateUrl: 'tdashboard.html',
})
export class TdashboardPage {

  tab1Root: any = TmainPage;
  tab2Root: any = ProfilePage;
  tab3Root: any = Tab3Root;
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
