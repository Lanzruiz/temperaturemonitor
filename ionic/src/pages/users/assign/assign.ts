import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AssignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assign',
  templateUrl: 'assign.html',
})
export class AssignPage {

  items = [
    {name:'John Gamble', position: 'Manager', company: 'Monika'},
    {name:'William Blake', position: 'Manager', company: 'Monika'},
    {name:'Lanz Cameron', position: 'Manager', company: 'Monika'},
    {name:'Maxine Stewart', position: 'Manager', company: 'Monika'},
    {name:'Ian Mcbride', position: 'Manager', company: 'Monika'}
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignPage');
  }

}
