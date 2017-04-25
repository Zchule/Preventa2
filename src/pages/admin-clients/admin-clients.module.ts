import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminClientsPage } from './admin-clients';

@NgModule({
  declarations: [
    AdminClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminClientsPage),
  ],
  exports: [
    AdminClientsPage
  ]
})
export class AdminClientsModule {}
