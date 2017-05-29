import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductService } from '../../providers/product.service';

@IonicPage()
@Component({
  selector: 'page-tabs-category',
  templateUrl: 'tabs-category.html',
})
export class TabsCategoryPage {

  tabs: any[] = [];
  page: string = "ProductsPage";

  constructor(
   public navCtrl: NavController,
   public navParams: NavParams,
   public productService: ProductService
   ) {
    this.tabs = this.navParams.get('tabs');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsCategory');
    
  }

}
