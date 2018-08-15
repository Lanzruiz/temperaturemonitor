import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssigneePage } from './assignee';

@NgModule({
  declarations: [
    AssigneePage,
  ],
  imports: [
    IonicPageModule.forChild(AssigneePage),
  ],
})
export class AssigneePageModule {}
