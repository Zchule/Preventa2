import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListsClientsPage } from './list-clients';

@NgModule({
  declarations: [
    ListsClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListsClientsPage),
  ],
  exports: [
    ListsClientsPage
  ]
})
export class ListClientsModule {}
