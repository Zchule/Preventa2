import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service'; 


@IonicPage()
@Component({
  selector: 'page-home-presale',
  templateUrl: 'home-presale.html',
})
export class HomePresalePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public authService: AuthService
    ) {
      firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot("LoginPage");
      }
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false,'menuUser');
    this.menuCtrl.enable(true,'menuPreventa');
  }

  logout() {
  console.log("salir");
  this.authService.doLogout();
  }

}
