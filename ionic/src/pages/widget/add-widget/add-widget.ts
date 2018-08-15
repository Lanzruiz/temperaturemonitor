import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FilterUserPage } from '../../pages';
import { CharttypePage } from '../../pages';
import { WidgetsProvider } from '../../../providers/providers';

/**
 * Generated class for the AddWidgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-widget',
  templateUrl: 'add-widget.html',
})
export class AddWidgetPage {

  main : object [];
  currentItems: any;
  keys: String[];
  dataParameters : object [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public widgetsProvider: WidgetsProvider) {

     this.widgetsProvider.getWidgetType().subscribe(
        (res: any) => {
         //console.log(res);
          this.currentItems = res;
          //console.log(this.main);
          console.log('widget from api', this.currentItems);
        },
        error => {
          console.log(error);
        });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWidgetPage');
  }

  selectWidget(label : any) {
  	this.navCtrl.push(CharttypePage, {
      name: label
    });
  }

  clickChartType() {
    this.navCtrl.push(CharttypePage);
  }
}
