import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import { ProductService } from '../../providers/product-service';

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public productService: ProductService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHome');
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuPreventa');
    this.menuCtrl.enable(false,'menuUser')
  }

  goToAdminUsersPage() {
    this.navCtrl.push('AdminUsersPage');
  }

  goToAdminProductsPage() {
    this.navCtrl.setRoot('AdminProductsPage');
  }
  goToProductsPage() {
    this.productService.getData()
    .then(data => {
      this.navCtrl.push('TabsCategoryPage', {
        tabs: data
      });
    })
    .catch(error => {
      console.error(error);
    })
  }
  goToAdminPreventaPage() {
    this.navCtrl.setRoot('AdminPreventaPage');
  }

  goToAdminClientsPage() {
    this.navCtrl.push('AdminClientsPage');
  }
  goToMapPage(){
    this.navCtrl.push('MapPreventaPage');
  }
}
