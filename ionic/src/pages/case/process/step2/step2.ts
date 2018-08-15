import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Step3Page } from '../../../pages';

/**
 * Generated class for the Step2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-step2',
  templateUrl: 'step2.html',
})
export class Step2Page {

  headsup: string;
  next: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.headsup = navParams.get('data');
    this.next = navParams.get('next');
    console.log(this.headsup);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step2Page');
  }

  clickStep() {

    if(this.next == 6) {
      this.navCtrl.push(Step3Page, {
         option1: "YES",
         option2: "NO",
         next: 7
      });
    } else {
      this.navCtrl.push(Step3Page, {
         option1: "Door seal is working - good condition",
         option2: "Door seal is faulty or worn"
      });
    }  
  }

}
