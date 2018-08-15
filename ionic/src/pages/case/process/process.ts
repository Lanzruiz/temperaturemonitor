import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Step2Page } from '../../pages';

/**
 * Generated class for the ProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-process',
  templateUrl: 'process.html',
})
export class ProcessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProcessPage');
  }

  clickStep2() {
    this.navCtrl.push(Step2Page, { 
         data: "Please check the door seal if properly close. (a peice of rubber that stops air getting into the fridge)"
      });
  }

}
