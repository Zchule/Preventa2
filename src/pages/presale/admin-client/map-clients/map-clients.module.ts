import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapClientsPage } from './map-clients';

@NgModule({
  declarations: [
    MapClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapClientsPage),
  ],
  exports: [
    MapClientsPage
  ]
})
export class MapClientsPageModule {}
