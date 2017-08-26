import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { OrderService } from '../../../providers/order.service'; 
import { ProductService } from '../../../providers/product.service';
import { PushService } from '../../../providers/push.service';

@IonicPage()
@Component({
  selector: 'page-order-distributor',
  templateUrl: 'order-distributor.html',
})
export class OrderDistributorPage {

  products: any[] = [];
  total: number = 0;
  fireProducts: FirebaseListObservable<any>;
  state: string = 'init';
  user: any = {};
  sendNotification: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private orderService: OrderService,
    private productService: ProductService,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private pushService: PushService
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

  done(){
    let alert = this.alertCtrl.create({
      title: '¿Está seguro?',
      message: 'Se actualizará este pedido como entregado',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Si, estoy seguro",
          handler: ()=>{
            this.doneOrder();
          }
        }
      ]
    });
    alert.present();
  }

  private doneOrder(){
    let load = this.loadCtrl.create({
      content: 'Actualizando pedido'
    });
    load.present();
    this.orderService.updateOrder(this.navParams.get('order'),{
      state: 'done'
    })
    .then(() => Promise.all(this.updateProducts()))
    .then(() => {
      if(this.sendNotification){
        return this.pushService.sendPushPreventa('Hay productos que están por agotarse')
      }
      return Promise.resolve(true);
    })
    .then(() =>{
      load.dismiss();
      load.onDidDismiss(()=>{
        this.close();
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

  private updateProducts(){
    let promises = [];
    this.products.forEach((product)=>{
      let key = product.key;
      let cant = product.cant - product.count;
      if(cant <= 5 && !this.sendNotification){
        this.sendNotification = true;
      }
      promises.push(this.updateCount(key, cant));
    });
    return promises;
  }

  private updateCount(key, cant){
    console.log(key, cant);
    return this.productService.update(key, {
      cant: cant
    });
  }

}
