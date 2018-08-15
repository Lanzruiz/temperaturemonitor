import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Step2Page } from '../../../pages';

/**
 * Generated class for the Step5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-step5',
  templateUrl: 'step5.html',
})
export class Step5Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step5Page');
  }

  clickStep() {
    this.navCtrl.push(Step2Page, 
      { 
         data: "Is it possible to change your process so that the door is not left open for more than 30 seconds at a time?",
         next: 6
      }

    );
  }


}
