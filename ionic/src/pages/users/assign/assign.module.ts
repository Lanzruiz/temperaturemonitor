import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignPage } from './assign';

@NgModule({
  declarations: [
    AssignPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignPage),
  ],
})
export class AssignPageModule {}
