import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TdashboardPage } from '../pages';

/**
 * Generated class for the AuthcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authcode',
  templateUrl: 'authcode.html',
})
export class AuthcodePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthcodePage');
  }

   // Attempt to login in through our User service
  doConfirm() {
    
      this.navCtrl.push(TdashboardPage);
    
    
  }

}
