import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCategoriesPage } from './admin-categories';

@NgModule({
  declarations: [
    AdminCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCategoriesPage),
  ],
  exports: [
    AdminCategoriesPage
  ]
})
export class AdminCategoriesModule {}
