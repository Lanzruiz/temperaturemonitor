import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskPage } from '../../pages';
import { DataParametersPage } from '../../pages';

/**
 * Generated class for the CharttypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charttype',
  templateUrl: 'charttype.html',
})
export class CharttypePage {

  data : any;

   items = [
    {name:'Donut', component: 'SitesPage'},
    {name:'Progress Bar', component: 'CasePage'}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('name');
    console.log('loaded in charttype', this.data);
    

	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CharttypePage');
  }

  dataParameters() {
    this.navCtrl.push(DataParametersPage, {
      data: this.data
    });
  }

  addChart() {
    this.navCtrl.push(TaskPage);
  }

}
