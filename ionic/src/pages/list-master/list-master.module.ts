import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListMasterPage } from './list-master';
import { TenantsProvider } from '../../providers/providers';

@NgModule({
  declarations: [
    ListMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMasterPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListMasterPage
  ],
  providers: [
    TenantsProvider
  ]
})
export class ListMasterPageModule { }
