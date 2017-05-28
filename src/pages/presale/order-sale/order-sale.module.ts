import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSalePage } from './order-sale';

@NgModule({
  declarations: [
    OrderSalePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSalePage),
  ],
  exports: [
    OrderSalePage
  ]
})
export class OrderSalePageModule {}
