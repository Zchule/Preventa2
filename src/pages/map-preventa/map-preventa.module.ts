import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPreventaPage } from './map-preventa';

@NgModule({
  declarations: [
    MapPreventaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPreventaPage),
  ],
  exports: [
    MapPreventaPage
  ]
})
export class MapPreventaModule {}
