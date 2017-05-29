import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController, LoadingController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { OrderService } from '../../../../providers/order.service'; 

@IonicPage({
  name: 'OrderPresalePage',
  segment: 'order-presale/:order'
})
@Component({
  selector: 'page-order-presale',
  templateUrl: 'order-presale.html',
})
export class OrderPresalePage {

  products: any[] = [];
  total: number = 0;
  fireProducts: FirebaseListObservable<any>;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private orderService: OrderService,
    private navCtrl: NavController,
    private loadCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.fireProducts = this.orderService.getProducstOrder(this.navParams.get('order'));
    this.fireProducts.subscribe((products)=>{
      this.products = products;
      let total = 0;
      this.products.forEach((item)=>{
        total+= item.price * item.count;
      });
      this.total = total;
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }

  delete( product ){
    this.fireProducts.remove( product.$key );
  }

  done(){
    let load = this.loadCtrl.create({
      content: 'Finalizando pedido'
    });
    load.present();
    this.orderService.updateOrder(this.navParams.get('order'),{
      state: 'pending',
    })
    .then(()=>{
      load.dismiss();
      load.onDidDismiss(()=>{
        this.navCtrl.setRoot('HomePresalePage');
      });
    })
    .catch(error=>{
      load.dismiss();
      console.error(error);
    });
  }

}
