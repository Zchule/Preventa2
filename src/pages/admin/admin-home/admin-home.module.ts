import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminHomePage } from './admin-home';

@NgModule({
  declarations: [
    AdminHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminHomePage),
  ],
  exports: [
    AdminHomePage
  ]
})
export class AdminHomeModule {}
