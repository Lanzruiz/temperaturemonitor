import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataParametersPage } from './data-parameters';

@NgModule({
  declarations: [
    DataParametersPage,
  ],
  imports: [
    IonicPageModule.forChild(DataParametersPage),
  ],
})
export class DataParametersPageModule {}
