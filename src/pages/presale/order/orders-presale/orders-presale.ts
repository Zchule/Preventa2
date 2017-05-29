import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { OrderService } from '../../../../providers/order.service'; 

@IonicPage()
@Component({
  selector: 'page-orders-presale',
  templateUrl: 'orders-presale.html',
})
export class OrdersPresalePage {

  fireOrders: FirebaseListObservable<any>;
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
    this.fireOrders = this.orderService.getOrders();
    this.fireOrders.subscribe(orders=>{
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
            this.showOrder( order.$key );
          }
        },
        {
          text: 'Editar',
          icon: 'create',
          handler: ()=>{
            this.goToCategoryPresalePage( order.$key );
          }
        },
        {
          text: 'Eliminar',
          icon:'trash',
          role: 'destructive',
          handler: ()=>{
            this.showAlertDelete( order.$key );
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
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
      order: order,
      state: order.state
    });
    modal.present();
  }

  goToCategoryPresalePage( order ){
    this.navCtrl.push('CategoryPresalePage',{
      order: order.key
    });
  }

  showAlertDelete( order: string){
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
            this.fireOrders.remove( order );
          }
        },
      ]
    });
    alert.present();
  }


}
