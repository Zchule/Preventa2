import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListsOrdersDistributorPage } from './lists-orders-distributor';

@NgModule({
  declarations: [
    ListsOrdersDistributorPage,
  ],
  imports: [
    IonicPageModule.forChild(ListsOrdersDistributorPage),
  ],
  exports: [
    ListsOrdersDistributorPage
  ]
})
export class ListsOrdersDistributorPageModule {}
