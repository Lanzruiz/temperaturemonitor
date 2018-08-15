import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PreviewPage } from './preview';

@NgModule({
  declarations: [
     PreviewPage
  ],
  imports: [
    IonicPageModule.forChild(PreviewPage),
    TranslateModule.forChild()
  ],
  exports: [
     PreviewPage
  ]
})
export class  PreviewPageModule { }
