import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProductsPage } from './admin-products';

@NgModule({
  declarations: [
    AdminProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminProductsPage),
  ],
  exports: [
    AdminProductsPage
  ]
})
export class AdminProductsModule {}
