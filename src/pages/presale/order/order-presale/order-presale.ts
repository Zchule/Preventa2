import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController, LoadingController, App } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { OrderService } from '../../../../providers/order.service'; 

@IonicPage()
@Component({
  selector: 'page-order-presale',
  templateUrl: 'order-presale.html',
})
export class OrderPresalePage {

  products: any[] = [];
  total: number = 0;
  fireProducts: FirebaseListObservable<any>;
  state: string = 'init';
  user: any = {};

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private orderService: OrderService,
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private app: App
  ) {
    this.state = this.navParams.get('state');
  }

  ionViewDidLoad() {
    this.getClient();
    this.getProducts();
  }

  close(){
    return this.viewCtrl.dismiss();
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
      total: this.total
    })
    .then(()=>{
      load.dismiss();
      load.onDidDismiss(()=>{
        this.close();
        this.app.getRootNav().setRoot('HomePresalePage');
      });
    })
    .catch(error=>{
      load.dismiss();
      console.error(error);
    });
  }

  private getClient(){
    this.orderService.getOrderClient(this.navParams.get('order'))
    .subscribe(user =>{
      this.user = user;
    });
  }

  private getProducts(){
    this.fireProducts = this.orderService.getOrderProducts(this.navParams.get('order'));
    this.fireProducts.subscribe((products)=>{
      this.products = products;
      let total = 0;
      this.products.forEach((item)=>{
        total+= item.price * item.count;
      });
      this.total = total;
    });
  }


}
