import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CaseFilterModal } from './case-filter-modal';

@NgModule({
  declarations: [
     CaseFilterModal
  ],
  imports: [
    IonicPageModule.forChild(CaseFilterModal),
    TranslateModule.forChild()
  ],
  exports: [
     CaseFilterModal
  ]
})
export class  CaseFilterModalModule { }
