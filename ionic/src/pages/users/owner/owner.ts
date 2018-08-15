import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { OwnerSecondPage } from '../../pages';

/**
 * Generated class for the OwnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-owner',
  templateUrl: 'owner.html',
})
export class OwnerPage {

  		

  	currOwner: any;

  	oldOwner : any;


  	showSave = false;
	constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,  public viewCtrl: ViewController) {
		 this.currOwner = this.navParams.get('owner');
		 this.oldOwner = this.navParams.get('owner');


	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OwnerPage');
	}

	dismiss() {
	   this.viewCtrl.dismiss(this.currOwner);
	}

	setParameters(selected){

		let ownerModal = this.modalCtrl.create(OwnerSecondPage, { selected : selected, data:this.currOwner });
		ownerModal.onDidDismiss(data => {
		     if(data) {
		     	this.viewCtrl.dismiss(data);
		     }
	   });
	   ownerModal.present();

	}
	radioChecked(){
		if(this.oldOwner != this.currOwner) {
			this.showSave = true;
			document.getElementById("title").style.marginRight = "0";	
		}
	}

	saveClicked() {
		this.viewCtrl.dismiss(this.currOwner);
	}
}
