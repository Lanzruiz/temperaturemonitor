import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PermscopePage } from './permscope';

@NgModule({
  declarations: [
    PermscopePage,
  ],
  imports: [
    IonicPageModule.forChild(PermscopePage),
  ],
})
export class PermscopePageModule {}
