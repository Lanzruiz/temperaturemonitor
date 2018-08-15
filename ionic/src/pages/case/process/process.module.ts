import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProcessPage } from './process';

@NgModule({
  declarations: [
    ProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(ProcessPage),
    TranslateModule.forChild()
  ],
  exports: [
    ProcessPage
  ]
})
export class ProcessPageModule { }
