import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Pedido page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pedido');
  }
  loginCliente(event: Event){
    event.preventDefault();
    console.log(event);
    this.navCtrl.push('AdminProductsPage');
  }

}
