import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { OrderService } from '../../../providers/order.service'; 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-lists-orders-distributor',
  templateUrl: 'lists-orders-distributor.html',
})
export class ListsOrdersDistributorPage {

  orders: any[] = [];
  showOrders: any[] = [];
  state: string = 'all';
  type: string = 'all';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private storage:Storage
  ) {
    this.state = this.navParams.get('state') || 'all';
    this.type = this.navParams.get('type') || 'all';
  }

  ionViewDidLoad() {
    let load = this.loadCtrl.create();
    load.present();
    this.storage.get('session')
    .then(data =>{
      let profile = JSON.parse(data);
      return this.orderService.getProductsByZone(profile.zone || '');
    })
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
      type: this.type
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
