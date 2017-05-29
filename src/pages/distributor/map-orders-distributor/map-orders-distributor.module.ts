import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapOrdersDistributorPage } from './map-orders-distributor';

@NgModule({
  declarations: [
    MapOrdersDistributorPage,
  ],
  imports: [
    IonicPageModule.forChild(MapOrdersDistributorPage),
  ],
  exports: [
    MapOrdersDistributorPage
  ]
})
export class MapOrdersDistributorPageModule {}
