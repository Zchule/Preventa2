import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPedidosPage } from './list-pedidos';

@NgModule({
  declarations: [
    ListPedidosPage ,
  ],
  imports: [
    IonicPageModule.forChild(ListPedidosPage),
  ],
  exports: [
    ListPedidosPage 
  ]
})
export class ListPedidosModule {}
