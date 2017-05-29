import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { TypeProductsService } from '../../../../providers/type-products.service';
import { CategoryProductsService } from '../../../../providers/category-products.service';

@IonicPage({
  name: 'CategoryPresalePage',
  segment: 'category-presale/:order'
})
@Component({
  selector: 'page-category-presale',
  templateUrl: 'category-presale.html',
})
export class CategoryPresalePage {

  typeSelected: string = 'all';
  types: any[] = [];
  categories: any[] = [];
  showCategories: any = [];

  order: string = '';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private categoriesService: CategoryProductsService,
    private typesService: TypeProductsService
  ) {
    this.order = this.navParams.get('order');
  }

  ionViewDidLoad(){
    this.categoriesService.getAll()
    .subscribe(categories =>{
      this.categories = categories;
      this.showCategories = this.categories;
    });

    this.typesService.getAll()
    .subscribe(types =>{
      this.types = types;
    });
  }

  goToProductsPresalePage( category ){
    this.navCtrl.push('ProductsPresalePage',{
      order: this.order,
      category: category.value
    });
  }

  onSelect( event ){
    this.typeSelected = event.value;
    this.showCategories = this.getCategories();
  }

  showOrder(){
    let modal = this.modalCtrl.create('OrderPresalePage',{
      order: this.navParams.get('order'),
      state: 'init'
    });
    modal.present();
  }

  private getCategories(){
    if(this.typeSelected == 'all'){
      return this.categories;
    }else{
      return this.categories.filter(item =>{
        return item.type == this.typeSelected;
      });
    }
  }

}
