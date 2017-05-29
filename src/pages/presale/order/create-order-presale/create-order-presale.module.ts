import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateOrderPresalePage } from './create-order-presale';

@NgModule({
  declarations: [
    CreateOrderPresalePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateOrderPresalePage),
  ],
  exports: [
    CreateOrderPresalePage
  ]
})
export class CreateOrderPresalePageModule {}