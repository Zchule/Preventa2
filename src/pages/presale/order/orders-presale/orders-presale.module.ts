import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPresalePage } from './orders-presale';

@NgModule({
  declarations: [
    OrdersPresalePage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersPresalePage),
  ],
  exports: [
    OrdersPresalePage
  ]
})
export class OrdersPresalePageModule {}
