import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProductsPage } from './list-products';

@NgModule({
  declarations: [
    ListProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListProductsPage),
  ],
  exports: [
    ListProductsPage
  ]
})
export class ListProductsModule {}
