import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list-category2',
  templateUrl: 'list-category2.html',
})
export class ListCategory2Page {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController
    ) {
      
  }

  ionViewDidLoad() {
    console.log('Alimentos');
    //this.menuCtrl.enable(true,'menuA');
    //this.menuCtrl.enable(false,'menu');
  }

}
