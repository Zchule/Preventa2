import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home-distributor',
  templateUrl: 'home-distributor.html',
})
export class HomeDistributorPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private menuCtrl: MenuController
  ) {}

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(true, 'menuDistributor')
    this.menuCtrl.enable(false, 'menuPresale')
  }

  goToListsOrdersDistributorPage(state, type){
    this.navCtrl.push('ListsOrdersDistributorPage',{
      state: state,
      type: type
    });
  }

}
