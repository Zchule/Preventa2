import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDistributorPage } from './order-distributor';

@NgModule({
  declarations: [
    OrderDistributorPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderDistributorPage),
  ],
  exports: [
    OrderDistributorPage
  ]
})
export class OrderDistributorPageModule {}
