import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, PopoverController } from 'ionic-angular';

import { OrderService } from '../../../providers/order.service'; 

@IonicPage()
@Component({
  selector: 'page-lists-orders-distributor',
  templateUrl: 'lists-orders-distributor.html',
})
export class ListsOrdersDistributorPage {

  orders: any[] = [];
  showOrders: any[] = [];
  state: string;
  type: string;
  zone: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) {
    this.state = this.navParams.get('state') || 'all';
    this.type = this.navParams.get('type') || 'all';
    this.zone = this.navParams.get('zone') || 'Norte';
  }

  ionViewDidLoad() {
    let load = this.loadCtrl.create();
    load.present();

    this.orderService.getProductsByZone(this.zone)
    .then((orders:any[]) =>{
      console.log(orders);
      this.orders = orders;
      this.showOrders = this.getOrders();
      load.dismiss();
    })
    .catch(error =>{
      load.dismiss();
      console.log(error);
    });
  }

  showOrder( order ){
    let modal = this.modalCtrl.create('OrderDistributorPage',{
      order: order.key,
      state: order.state
    });
    modal.present();
  }

  goToMapOrdersDistributorPage(){
    this.navCtrl.push('MapOrdersDistributorPage',{
      state: this.state,
      type: this.type,
      zone: this.zone
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopoverZonesPage');
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data =>{
      if(data){
        this.zone = data;
        this.ionViewDidLoad();
      }
    });
  }

  private getOrders(){
    if(this.state == 'all' && this.type == 'all'){
      return this.orders.filter(item =>{
        return item.state.toLocaleLowerCase() != 'init';
      });
    }else if(this.state == 'all' && this.type != 'all'){
      return this.orders.filter(item =>{
        return item.type.toLocaleLowerCase() == this.type.toLocaleLowerCase();
      });
    }else if(this.state != 'all' && this.type == 'all'){
      return this.orders.filter(item =>{
        return item.state.toLocaleLowerCase() == this.state.toLocaleLowerCase();
      });
    }else if(this.state != 'all' && this.type != 'all'){
      return this.orders.filter(item =>{
        return item.state.toLocaleLowerCase() == this.state.toLocaleLowerCase() && 
               item.type.toLocaleLowerCase() == this.type.toLocaleLowerCase();
      });
    }
  }

}
