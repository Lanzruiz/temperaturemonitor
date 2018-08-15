import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CaseDetailPage } from './case-detail';

@NgModule({
  declarations: [
    CaseDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    CaseDetailPage
  ]
})
export class CaseDetailPageModule { }
