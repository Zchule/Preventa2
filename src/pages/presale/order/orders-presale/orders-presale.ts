import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';

import { OrderService } from '../../../../providers/order.service'; 

@IonicPage()
@Component({
  selector: 'page-orders-presale',
  templateUrl: 'orders-presale.html',
})
export class OrdersPresalePage {

  orders: any[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    let load = this.loadCtrl.create();
    load.present();
    this.orderService.getOrders().subscribe(orders=>{
      this.orders = orders;
      load.dismiss();
    });
  }

  showOptions( order ){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Ver',
          icon: 'contact',
          handler: ()=>{
            this.showOrder( order );
          }
        },
        {
          text: 'Editar',
          icon: 'create',
          handler: ()=>{
            this.goToCategoryPresalePage( order );
          }
        },
        {
          text: 'Eliminar',
          icon:'trash',
          role: 'destructive',
          handler: ()=>{
            this.showAlertDelete( order );
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: ()=>{
            console.log('cancel');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showOrder( order ){
    let modal = this.modalCtrl.create('OrderPresalePage',{
      order: order.$key,
      state: order.state
    });
    modal.present();
  }

  goToCategoryPresalePage( order ){
    this.navCtrl.push('CategoryPresalePage',{
      order: order.$key
    });
  }

  showAlertDelete( order: any){
    let alert = this.alertCtrl.create({
      title: '¿Estás seguro?',
      message: 'El pedido se eliminara',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('cancelar');
          }
        },
        {
          text: 'Si, estoy seguro',
          handler: ()=>{
            this.orderService.deleteOrder( order.$key );
          }
        },
      ]
    });
    alert.present();
  }


}
