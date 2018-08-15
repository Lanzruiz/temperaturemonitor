import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-add-tenant',
  templateUrl: 'index.html'
})
export class AddTenantPage {
  constructor(
      public navCtrl: NavController,
      public platform: Platform,
      public actionsheetCtrl: ActionSheetController
    ) {}

  onGoBack() {
    this.navCtrl.pop();
  }
  
  openStatusBox() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Select Status',
      cssClass: 'action-select-status',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Deleted');
          }
        },
        {
          text: 'Activate',
          handler: () => {
            console.log('Activated');
          }
        },
        {
          text: 'Deactivate',
          handler: () => {
            console.log('Deactivated');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
