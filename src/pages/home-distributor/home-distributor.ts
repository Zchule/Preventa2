import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { AuthService } from '../../providers/auth.service'; 


@IonicPage()
@Component({
  selector: 'page-home-distributor',
  templateUrl: 'home-distributor.html',
})
export class HomeDistributorPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService
    ) {
      firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot("LoginPage");
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeDistributor');
  }

  logout() {
  this.authService.doLogout();
  }

}
