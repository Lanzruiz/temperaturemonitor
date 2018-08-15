import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { AuthSetupPage } from '../pages';
import { IconTextPage } from '../pages';
/**
 * Generated class for the RegsuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regsuccess',
  templateUrl: 'regsuccess.html',
})
export class RegsuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  doProceed() {
     this.navCtrl.push(AuthSetupPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegsuccessPage');
  }

}
