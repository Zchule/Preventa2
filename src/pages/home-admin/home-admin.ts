import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';

import firebase from 'firebase';
import { AuthService } from '../../providers/auth.service'; 

import { ProductService } from '../../providers/product.service';


@IonicPage()
@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html',
})
export class HomeAdminPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public productService: ProductService,
    public authService: AuthService
    ) {
      firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot("LoginPage");
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAdmin');
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuPreventa');
    this.menuCtrl.enable(false,'menuUser')
  }

  goToAdminUsersPage() {
    this.navCtrl.setRoot('ListUsersPage');
  }

  goToAdminProductsPage() {
    this.navCtrl.setRoot('ListProductsPage');
  }

  logout() {
  this.authService.doLogout();
  }

}
