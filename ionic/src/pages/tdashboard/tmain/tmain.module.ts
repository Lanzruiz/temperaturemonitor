import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TmainPage } from './tmain';

@NgModule({
  declarations: [
    TmainPage,
  ],
  imports: [
    IonicPageModule.forChild(TmainPage),
  ],
})
export class TmainPageModule {}
