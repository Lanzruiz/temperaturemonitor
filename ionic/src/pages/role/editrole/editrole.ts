import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskPage } from '../../pages';
import { AlertController } from 'ionic-angular'
import { ScopePage } from '../../pages';
import { PermissionPage } from '../../pages';

/**
 * Generated class for the EditrolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editrole',
  templateUrl: 'editrole.html',
})
export class EditrolePage {

  
   componentName: string;
   testRadioOpen = false;
   testRadioResult: any;
   testCheckboxOpen = false;
   testCheckboxResult: any

  items = [
    {name:'Scope', component: ''},
    {name:'Default Permission', component: ''},
    {name:'Default Dashboard', component: ''}

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditrolePage');
  }

  editPermission() {
     this.navCtrl.push(PermissionPage);
  }

  editDashboard() {
     this.navCtrl.push(TaskPage);
  }

  clickSave() {
     let alert = this.alertCtrl.create({
      title: 'Edit Role',
      message: 'Are you sure you want to proceed on the changes you made here?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push(TaskPage);
          }
        }
      ]
    });

    alert.present();
  }
}
