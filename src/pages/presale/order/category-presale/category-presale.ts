import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage({
  name: 'CategoryPresalePage',
  segment: 'category-presale/:order'
})
@Component({
  selector: 'page-category-presale',
  templateUrl: 'category-presale.html',
})
export class CategoryPresalePage {

  typeSelected: string = 'cuidado';
  categories: any[] = [
    {
      title: 'Detergente en polvo',
      image: 'https://cdn.galileo.pgsitecore.com/es-mx/-/media/Ariel_MX/Images/Products/Ariel-MB-1-kg-FT.png',
      type: 'cuidado'
    },
    {
      title: 'Detergente en barra',
      image: 'http://industrialapopular.com/wp-content/uploads/2015/12/Barra-Detergente1.png',
      type: 'cuidado'
    },
    {
      title: 'Soya',
      image: 'http://ibescosocial.com/wordpress/wp-content/uploads/2016/03/soja-1.jpg',
      type: 'alimentos'
    },
    {
      title: 'Quinua',
      image: 'http://guia.agrecolandes.org/wp-content/uploads/2016/04/quinua.png',
      type: 'alimentos'
    },
    {
      title: 'gaseosas',
      image:'http://pizzali.net/wp-content/uploads/2014/08/40-138-large.jpg',
      type: 'bebidas'
    }
  ];
  showCategories: any = [];

  order: string = '';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.showCategories = this.getCategories();
    this.order = this.navParams.get('order');
  }

  goToProductsPresalePage(){
    this.navCtrl.push('ProductsPresalePage',{
      order: this.order
    });
  }

  segmentChanged( event ){
    this.typeSelected = event.value;
    this.showCategories = this.getCategories();
  }

  showOrder(){
    let modal = this.modalCtrl.create('OrderPresalePage',{
      order: this.navParams.get('order')
    });
    modal.present();
  }

  private getCategories(){
    return this.categories.filter(item =>{
      return item.type == this.typeSelected;
    });
  }

}
