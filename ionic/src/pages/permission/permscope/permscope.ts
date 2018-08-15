import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { PermissionPage } from '../../pages';

/**
 * Generated class for the PermscopePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-permscope',
  templateUrl: 'permscope.html',
})
export class PermscopePage {

  data : any;
  tenants = [
  	'IKEA',
  	'Mcdonalds',
  	'KFC'
  ];

  regions = [
  	'Richmond',
  	'Melbourne',
  	'Sydney'
  ];

  sites = [
  	'Kitchen',
  	'Freezer',
  	'Refrigerator'
  ];

  disableProceed = true;
  selectedTenant : any;
  selectedRegion : any;
  selectedSite : any;

  enableRegion = false;
  enableSite = false;
  showSave = false;

  showRegion = false;
  showSite = false;
  showTenant = false;

  allowPermissionToAll = false;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
  	this.data = navParams.get('data');
  	this.enableRegion = (this.selectedTenant);
    this.enableSite = (this.selectedRegion);
    this.showRegion = (this.data.regionScope);
    this.showSite = (this.data.siteScope);
    this.showTenant = (this.data.tenantScope);

    this.allowPermissionToAll = !this.showRegion && !this.showSite && !this.showTenant;
    if(this.allowPermissionToAll)
    	this.showSave = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermscopePage');
  }

  onParamChange() {
  	this.showSave = (this.selectedTenant != '');
  	this.enableRegion = (this.selectedTenant);
    this.enableSite = (this.selectedRegion);
    console.log(this.disableProceed);
  }

  proceedClick() {

  	let params = {
  		'tenant': this.selectedTenant,
  	    'region' : this.selectedRegion,
  	    'site' : this.selectedSite,
   	    'permission' : this.data.name,
   	    'permission_id' : this.data.id
  	} 
  	this.viewCtrl.dismiss(params);
  	//this.navCtrl.push(PermissionPage, {data:params});
  }

  dismiss() {
  	this.viewCtrl.dismiss();
  }
  

}
