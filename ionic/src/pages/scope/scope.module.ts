import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScopePage } from './scope';

@NgModule({
  declarations: [
    ScopePage,
  ],
  imports: [
    IonicPageModule.forChild(ScopePage),
  ],
})
export class ScopePageModule {}
