import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ComingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coming',
  templateUrl: 'coming.html',
})
export class ComingPage {

  test: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.test = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComingPage');
    //console.log(test);
  }

}
