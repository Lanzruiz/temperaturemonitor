import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Step4Page } from '../../../pages';

/**
 * Generated class for the Step3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-step3',
  templateUrl: 'step3.html',
})
export class Step3Page {

  option1: string;
  option2: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.option1 = navParams.get('option1');
    this.option2 = navParams.get('option2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step3Page');

  }

  clickStep(situation) {
    this.navCtrl.push(Step4Page, {data: situation});
  }

}
