import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHome');
  }

  goToAdminUsersPage(){
    this.navCtrl.push('AdminUsersPage');
  }

  goToAdminProductsPage(){
    this.navCtrl.push('AdminProductsPage');
  }
  

}
