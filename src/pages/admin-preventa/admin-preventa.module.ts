import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPreventaPage } from './admin-preventa';

@NgModule({
  declarations: [
    AdminPreventaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPreventaPage),
  ],
  exports: [
    AdminPreventaPage
  ]
})
export class AdminPreventaModule {}
