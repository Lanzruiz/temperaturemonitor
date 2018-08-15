import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import { SelectPage } from '../pages';

/**
 * Generated class for the PermissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-permission',
  templateUrl: 'permission.html',
})
export class PermissionPage {

   componentName: string;
   items = [];
   dataList = [];
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams,public modalCtrl:ModalController) {

      this.dataList = navParams.get('permission');

      console.log(this.dataList);
      this.populateList();
  }


  dismiss() {
     this.viewCtrl.dismiss(this.dataList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionPage');
  }

  addPermission() {
    let ownerModal = this.modalCtrl.create(SelectPage);
    ownerModal.onDidDismiss(data => {
        this.dataList.push(data);
        this.populateList();
       
     });
     ownerModal.present();
  }


  populateList(){
    this.items = [];
    console.log(this.dataList);
    for (let data of this.dataList) {
      if(data) {

        let locationText = data.tenant;
        if(data.region) {
          locationText = data.tenant+">"+data.region;
        }

        if(data.site){
           locationText = data.tenant+">"+data.region+">"+data.site;
        }
        let params = {
          'permission' : data.permission,
          'locationText': locationText,
        }
        this.items.push(params);
      }
    }

      
  }

}
