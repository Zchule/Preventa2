import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../../../providers/auth.service'; 


@IonicPage()
@Component({
  selector: 'page-home-presale',
  templateUrl: 'home-presale.html',
})
export class HomePresalePage {

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private fireAuth: AngularFireAuth
  ) {
    this.checkSession();
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'menuUser');
    this.menuCtrl.enable(true , 'menuPresale');
  }

  goToCreateOrderPresalePage(){
    this.navCtrl.push('CreateOrderPresalePage');
  }

  goToMapClientsPage(){
    this.navCtrl.push('MapClientsPage');
  }

  goToClientPage(){
    this.navCtrl.push('ListsClientsPage');
  }

  private checkSession(){
    // this.fireAuth.authState.subscribe((user) =>{
    //   console.log(user);
    //   if (user !== null) {
    //     this.navCtrl.setRoot("LoginPage");
    //   }
    // });
  }

}
