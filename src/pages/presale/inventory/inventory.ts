import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ModalController } from 'ionic-angular';

import { ProductService } from '../../../providers/product.service'; 

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  products: any[] = [];

  constructor(
    public navCtrl: NavController,
    private productsService: ProductService,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    let load = this.loadCtrl.create();
    load.present();

    this.productsService.getProductsByCant(5)
    .then(products =>{
      this.products = products;
      console.log(this.products);
      load.dismiss();
    })
    .catch(error =>{
      console.log(error);
      load.dismiss();
    });
  }

  goToProduct( product ){
    let modal = this.modalCtrl.create('ViewProductPage',{
      product: product,
      color: 'royal'
    });
    modal.present();
  }

}
