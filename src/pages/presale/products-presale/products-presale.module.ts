import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPresalePage } from './products-presale';

@NgModule({
  declarations: [
    ProductsPresalePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsPresalePage),
  ],
  exports: [
    ProductsPresalePage
  ]
})
export class ProductsPresalePageModule {}
