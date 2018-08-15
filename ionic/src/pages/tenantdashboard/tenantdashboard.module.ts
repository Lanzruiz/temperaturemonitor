import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TenantdashboardPage } from './tenantdashboard';

@NgModule({
  declarations: [
    TenantdashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(TenantdashboardPage),
  ],
})
export class TenantdashboardPageModule {}
