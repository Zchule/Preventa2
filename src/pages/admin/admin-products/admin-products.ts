import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { ProductService } from '../../../providers/product.service';

@IonicPage()
@Component({
  selector: 'page-admin-products',
  templateUrl: 'admin-products.html',
})
export class AdminProductsPage {

  products: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {
    this.products = this.productService.getAll();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuPreventa');
    this.menuCtrl.enable(true,'menuUser')
  }

  addProduct(){
    let modal = this.modalCtrl.create('FormProductPage');
    modal.present();
  }
  goToEdit(product){
    console.log(product);
    let modal2 = this.modalCtrl.create('FormProductPage',{
      product:product
    });
    modal2.present();

  }

}
