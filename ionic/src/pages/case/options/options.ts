import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CaseFilterPage } from '../../pages';
import { CaseSortPage } from '../../pages';

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  items = [
    {name:'Sort', component: 'SitesPage'},
    {name:'Filter', component: 'CasePage'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  clickFilter() {
     this.navCtrl.push(CaseFilterPage);
  }

  clickSort() {
     this.navCtrl.push(CaseSortPage );
  }

}
