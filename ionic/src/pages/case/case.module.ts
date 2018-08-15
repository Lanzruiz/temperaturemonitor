import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CasePage } from './case';

@NgModule({
  declarations: [
    CasePage,
  ],
  imports: [
    IonicPageModule.forChild(CasePage),
    TranslateModule.forChild()
  ],
  exports: [
    CasePage
  ]
})
export class CasePageModule { }
