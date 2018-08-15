import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataParametersPage } from '../../pages';

/**
 * Generated class for the FilterUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-user',
  templateUrl: 'filter-user.html',
})
export class FilterUserPage {

  filter : any;
  widget : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    var filters = [
      { 
        items: [
          { label : "Donut" } 
        ]
      },
      { 
        items: [
          { label : "Donut" }
        ]
      },
      { 
        items: [
          { label : "Donut" }
        ]
      },
      { 
        items: [
          { label : "Donut" },
          { label : "Progress" }
        ]
      },
      { 
        items: [
          { label : "Donut" },
          { label : "Progress" }
        ]
      },
      { 
        items: [
          { label : "Map" }
        ]
      },
      { 
        items: [
          { label : "Icon" },
          { label : "Donut" }
        ]
      },
      { 
        items: [
          { label : "Icon" },
          { label : "Meter" }
        ]
      },
      { 
        items: [
          { label : "Overview" },
        ]
      },
      { 
        items: [
          { label : "Donut" }
        ]
      }
    ];
    this.widget = navParams.get('widget');
    this.filter = filters[this.widget.id];

	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterUserPage');
  }

  selectType(type){

  	var widget = {
  		id : this.widget.id,
  		label : this.widget.label,
  		type : type
  	}
  	this.navCtrl.push(DataParametersPage, {
      widget: widget
    });
  }

}
