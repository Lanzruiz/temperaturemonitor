import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthcodePage } from './authcode';

@NgModule({
  declarations: [
    AuthcodePage,
  ],
  imports: [
    IonicPageModule.forChild(AuthcodePage),
  ],
})
export class AuthcodePageModule {}
