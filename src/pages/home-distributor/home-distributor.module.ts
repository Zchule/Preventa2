import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDistributorPage } from './home-distributor';

@NgModule({
  declarations: [
    HomeDistributorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDistributorPage),
  ],
  exports: [
    HomeDistributorPage
  ]
})
export class HomeDistributorModule {}
