import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWidgetPage } from './add-widget';

@NgModule({
  declarations: [
    AddWidgetPage,
  ],
  imports: [
    IonicPageModule.forChild(AddWidgetPage),
  ],
})
export class AddWidgetPageModule {}
