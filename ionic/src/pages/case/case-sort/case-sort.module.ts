import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CaseSortPage } from './case-sort';

@NgModule({
  declarations: [
     CaseSortPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseSortPage),
    TranslateModule.forChild()
  ],
  exports: [
     CaseSortPage
  ]
})
export class  CaseSortPageModule { }
