import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductService } from '../../providers/product.service';

import * as _ from "lodash";

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  category: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productsService: ProductService
  ) {
    this.category = this.navParams.get('category');
    this.getGroups();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Products');
  }

  private getGroups(){
    this.productsService.getCategories()
    .then(data => {
      console.log(data);
    })
    
    let products = this.category.products;
    let categories = _.groupBy(products, (item:any)=>{
      console.log(item);
      return item.category.id;
    });
    console.log(categories);
  }
  

}
