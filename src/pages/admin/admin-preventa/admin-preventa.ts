import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-admin-preventa',
  templateUrl: 'admin-preventa.html',
})
export class AdminPreventaPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPreventa');
    this.menuCtrl.enable(false,'menuUser');
    this.menuCtrl.enable(true,'menuPreventa');
  }
  
}
