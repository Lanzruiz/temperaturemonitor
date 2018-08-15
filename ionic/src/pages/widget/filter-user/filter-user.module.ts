import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterUserPage } from './filter-user';

@NgModule({
  declarations: [
    FilterUserPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterUserPage),
  ],
})
export class FilterUserPageModule {}
