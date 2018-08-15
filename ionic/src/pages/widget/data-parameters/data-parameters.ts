import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { TaskPage } from '../../pages';
/**
 * Generated class for the DataParametersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-parameters',
  templateUrl: 'data-parameters.html',
})
export class DataParametersPage {

  widgets : any;
  tenants : any;
  regions : any;
  sites : any;
  units : any;
  colors : any;
  showDone : false;
  items : any;
  name : any;

  selectedTenant: any;
  selectedRegion: any;
  selectedSite: any;
  selectedUnit: any;
  selectedColor :any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  	  this.widgets = navParams.get('data');
  	  this.tenants = ['Wolcester College','sample tenants', 'sample tenants 3'
  	  ]
  	  this.regions = ['Melbourne', 'Sydney', 'Adeline'
  	  ]
  	  this.sites = ['Victoria', 'sample site 1', 'sample 2'
  	  ]
  	  this.units = ['Cold Room Freezer', 'sample units 1', 'sample 2'
  	  ]
  	  this.colors = ['Yellow', 'Red', 'Blue'
  	  ]

      this.name = this.widgets.name;
      this.items = this.widgets.data;
      console.log('data array', this.items);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataParametersPage');
  }

  onTenantChange() {
  	console.log(this.selectedTenant);
  	this.enableDone();
  }

  onRegionChange() {
  	console.log(this.selectedRegion);
  		this.enableDone();
  }
  
  onSiteChange() {
  	console.log(this.selectedSite);
  	this.enableDone();
  }
  
  onUnitChange() {
  	console.log(this.selectedUnit);
  	this.enableDone();
  }
  
  onColorChange() {
  	console.log(this.selectedColor);
  	this.enableDone();
  }

  enableDone() {
  	this.showDone = this.selectedTenant && this.selectedSite && this.selectedRegion && this.selectedUnit && this.selectedColor;
  }

  doneClicked() {
  	 let alert = this.alertCtrl.create({
	    title: 'Widget Added',
	    message: 'widget is successfully added in your dashboard',
	    buttons: [
	      {
	        text: 'Ok',
	        role: 'ok',
	        handler: () => {
	         
			     
            }
	         
	      }
	      
	    ]
	  });
	  alert.present();
  }


}
