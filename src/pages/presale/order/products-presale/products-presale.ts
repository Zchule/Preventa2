import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import * as _ from "lodash";

import { OrderService } from '../../../../providers/order.service'; 
import { ProductService } from '../../../../providers/product.service'; 

@IonicPage({
  name: 'ProductsPresalePage',
  segment: 'products-presale/:order/:category'
})
@Component({
  selector: 'page-products-presale',
  templateUrl: 'products-presale.html',
})
export class ProductsPresalePage {

  productSelected: any = null;
  productsOrder: FirebaseListObservable<any>;
  showLoad: boolean = false;
  marks: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private toasCtrl: ToastController,
    private modalCtrl: ModalController,
    private productsService: ProductService
  ) {
  }

  ionViewDidLoad() {
    let load = this.loadCtrl.create();
    load.present();

    this.productsOrder = this.orderService.getProducstOrder(this.navParams.get('order'));
    this.productsService.getProductsByCategory(this.navParams.get('category'))
    .then(products =>{
      let marks = _.groupBy(products, 'mark');
      _.forEach(marks, (value, key) =>{
        this.marks.push({
          title: key,
          products: value
        })
      });
      load.dismiss();
    })
    .catch(error =>{
      console.error( error );
      load.dismiss();
    });
  }

  clickedProduct( product ){
    this.productSelected = Object.assign({}, product);
    this.productSelected.count = 0;
  }

  add(){
    if(this.productSelected.cant > 0){
      this.productSelected.count++;
      this.productSelected.cant--;
    }
  }

  remove(){
    if(this.productSelected.count > 0){
      this.productSelected.count--;
      this.productSelected.cant++;
    }
  }

  addProduct(){
    this.showLoad = true;
    this.productsOrder.push(this.productSelected)
    .then(data=>{
      this.showLoad = false;
      this.close();
      let toast = this.toasCtrl.create({
        message: 'Producto agregado',
        duration: 1000
      });
      toast.present();
    })
    .catch(error=>{
      this.showLoad = false;
      console.error(error);
    })
  }

  close(){
    this.productSelected = null;
  }

  showOrder(){
    let modal = this.modalCtrl.create('OrderPresalePage',{
      order: this.navParams.get('order'),
      state: 'init'
    });
    modal.present();
  }

}
