import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../../../providers/auth.service'; 
import { OrderService } from '../../../providers/order.service'; 

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
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private fireAuth: AngularFireAuth
  ) {
    this.checkSession();
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false, 'menuUser');
    this.menuCtrl.enable(true , 'menuPresale');
  }

  goToCategoryPresalePage(){
    let load = this.loadCtrl.create({
      content: 'Creando pedido'
    });
    load.present();
    this.orderService.createOrder({
      date: new Date().toISOString()
    })
    .then(order =>{
      load.dismiss();
      load.onDidDismiss(()=>{
        this.navCtrl.push('CategoryPresalePage',{
          order: order.key
        });
      })
    })
    .catch(error =>{
      console.error(error);
      load.dismiss();
    });
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
