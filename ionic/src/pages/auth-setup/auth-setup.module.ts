import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthSetupPage } from './auth-setup';

@NgModule({
  declarations: [
    AuthSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthSetupPage),
  ],
})
export class AuthSetupPageModule {}
