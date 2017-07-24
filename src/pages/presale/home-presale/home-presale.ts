import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home-presale',
  templateUrl: 'home-presale.html',
})
export class HomePresalePage {

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {}

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(false, 'menuDistributor')
    this.menuCtrl.enable(true, 'menuPresale')
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

}
