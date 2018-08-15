import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreaterolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createrole',
  templateUrl: 'createrole.html',
})
export class CreaterolePage {

   componentName: string;

  items = [
    {name:'Scope', component: ''},
    {name:'Default Permission', component: ''},
    {name:'Default Dashboard', component: ''}

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreaterolePage');
  }

}
