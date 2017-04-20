import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-category',
  templateUrl: 'tabs-category.html',
})
export class TabsCategoryPage {

  tab1: string = 'ListCategory1Page';
  tab2: string = 'ListCategory2Page';
  index: string = '0';

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   ) {
     this.index = this.navParams.get('index');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsCategory');
  }

}
