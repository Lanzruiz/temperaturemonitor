import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-edit-tenant',
  templateUrl: 'index.html'
})

export class EditTenantPage {
  constructor(
      public navCtrl: NavController,
      public platform: Platform,
      public actionsheetCtrl: ActionSheetController
    ) {}

    onGoBack() {
      this.navCtrl.pop();
    }
}
