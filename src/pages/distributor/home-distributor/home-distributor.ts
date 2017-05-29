import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../../../providers/auth.service'; 


@IonicPage()
@Component({
  selector: 'page-home-distributor',
  templateUrl: 'home-distributor.html',
})
export class HomeDistributorPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService, 
    private menuCtrl: MenuController,
    private loadCtrl: LoadingController,
    private fireAuth: AngularFireAuth
  ) {
    this.checkSession();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(true, 'menuDistributor')
    this.menuCtrl.enable(false, 'menuPresale')
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
