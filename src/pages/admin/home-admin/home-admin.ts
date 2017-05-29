import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import firebase from 'firebase';

import { AuthService } from '../../../providers/auth.service'; 
import { ProductService } from '../../../providers/product.service';

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

  ionViewDidEnter() {
    this.menuCtrl.enable(true, 'menuAdmin');
    this.menuCtrl.enable(false, 'menuDistributor')
    this.menuCtrl.enable(false, 'menuPresale')
  }

  goToListUsersPage() {
    this.navCtrl.setRoot('ListUsersPage');
  }

  goToListProductsPage() {
    this.navCtrl.setRoot('ListProductsPage');
  }

  logout() {
  this.authService.doLogout();
  }

}
