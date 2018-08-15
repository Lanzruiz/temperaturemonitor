import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Step5Page } from '../../../pages';

/**
 * Generated class for the Step4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-step4',
  templateUrl: 'step4.html',
})
export class Step4Page {

  situation: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.situation = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step4Page');
    console.log(this.situation);
  }

  clickStep5() {
    this.navCtrl.push(Step5Page);
  }

}
