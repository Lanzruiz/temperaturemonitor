import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenantlistPage } from './tenantlist';

@NgModule({
  declarations: [
    TenantlistPage,
  ],
  imports: [
    IonicPageModule.forChild(TenantlistPage),
  ],
})
export class TenantlistPageModule {}
