import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SecondauthcontentPage } from '../pages';
import { Tab2Root } from '../pages';
import { Tab3Root } from '../pages';

/**
 * Generated class for the AuthSetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth-setup',
  templateUrl: 'auth-setup.html'
})
export class AuthSetupPage {

  tab1Root: any = SecondauthcontentPage;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthSetupPage');
  }

}
