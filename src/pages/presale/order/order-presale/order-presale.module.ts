import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPresalePage } from './order-presale';

@NgModule({
  declarations: [
    OrderPresalePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPresalePage),
  ],
  exports: [
    OrderPresalePage
  ]
})
export class OrderPresalePageModule {}
