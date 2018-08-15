import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TdashboardPage } from './tdashboard';

@NgModule({
  declarations: [
    TdashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(TdashboardPage),
  ],
})
export class TdashboardPageModule {}
