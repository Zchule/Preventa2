import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';


import { OrderService } from '../../../providers/order.service'; 

@IonicPage()
@Component({
  selector: 'page-lists-orders-distributor',
  templateUrl: 'lists-orders-distributor.html',
})
export class ListsOrdersDistributorPage {

  orders: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
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
    let modal = this.modalCtrl.create('OrderDistributorPage',{
      order: order.$key
    });
    modal.present();
  }

}
