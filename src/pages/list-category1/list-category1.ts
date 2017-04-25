import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-category1',
  templateUrl: 'list-category1.html',
})
export class ListCategory1Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController
    ) {
  }

  ionViewDidLoad() {
    console.log('Cuidado Personal');
    //this.menuCtrl.enable(true,'menu');
  //  this.menuCtrl.enable(false,'menuA');
  }

}
