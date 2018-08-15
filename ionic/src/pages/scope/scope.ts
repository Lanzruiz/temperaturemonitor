import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ScopePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scope',
  templateUrl: 'scope.html',
})
export class ScopePage {

  items = [
    {name:'All Tenants', component: 'SitesPage'},
    {name:'IKIA', component: 'CasePage'}
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScopePage');
  }

}
