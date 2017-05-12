import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewClientPage } from './view-client';

@NgModule({
  declarations: [
    ViewClientPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewClientPage),
  ],
  exports: [
    ViewClientPage
  ]
})
export class ViewClientModule {}
