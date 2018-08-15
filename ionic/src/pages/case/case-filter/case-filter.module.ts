import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CaseFilterPage } from './case-filter';

@NgModule({
  declarations: [
     CaseFilterPage
  ],
  imports: [
    IonicPageModule.forChild(CaseFilterPage),
    TranslateModule.forChild()
  ],
  exports: [
     CaseFilterPage
  ]
})
export class  CaseFilterPageModule { }
