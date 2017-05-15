import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePresalePage } from './home-presale';

@NgModule({
  declarations: [
    HomePresalePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePresalePage),
  ],
  exports: [
    HomePresalePage
  ]
})
export class HomePresaleModule {}
