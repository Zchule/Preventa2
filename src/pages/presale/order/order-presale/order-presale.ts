import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
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

  products: FirebaseListObservable<any>;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private orderService: OrderService
  ) {
  }

  ionViewDidLoad() {
    this.products = this.orderService.getProducstOrder(this.navParams.get('order'))
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
