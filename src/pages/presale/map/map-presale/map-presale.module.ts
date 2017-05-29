import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPresalePage } from './map-presale';

@NgModule({
  declarations: [
    MapPresalePage,
  ],
  imports: [
    IonicPageModule.forChild(MapPresalePage),
  ],
  exports: [
    MapPresalePage
  ]
})
export class MapPresalePageModule {}
