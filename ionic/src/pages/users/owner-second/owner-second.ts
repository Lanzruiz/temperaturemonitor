import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the OwnerSecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-owner-second',
  templateUrl: 'owner-second.html',
})
export class OwnerSecondPage {

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
  selected : any;
  data : any;
  selectedTenant : any;
  selectedRegion : any;
  selectedSite : any;

  enableRegion = false;
  enableSite = false;

  showSave = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.selected = this.navParams.get('selected');
    this.data = this.navParams.get('data');
    if(this.data) {
      this.selectedTenant = this.data.tenant;
      this.selectedRegion = this.data.region;
      this.selectedSite = this.data.site;
    }
    this.enableRegion = (this.selectedTenant);
    this.enableSite = (this.selectedRegion);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnerSecondPage');
    this.enableSave();
    this.enableRegion = (this.selectedTenant);
    this.enableSite = (this.selectedRegion);
  }

  onParamChange(){
    this.enableRegion = (this.selectedTenant);
    this.enableSite = (this.selectedRegion);
    this.enableSave();
  }


  enableSave() {
    if(this.selected == 'tenant')
      this.showSave = this.selectedTenant 
    else if (this.selected == 'region')
      this.showSave = this.selectedTenant && this.selectedRegion;
    else if (this.selected == 'site')
      this.showSave = this.selectedTenant && this.selectedSite && this.selectedRegion;

    if(this.showSave)
      document.getElementById("title").style.marginRight = "0";
  }

  saveClicked() {
      this.viewCtrl.dismiss({'tenant': this.selectedTenant, 'region' : this.selectedRegion, 'site' : this.selectedSite});
  }

  dismiss() {
     this.viewCtrl.dismiss();
  }


}
