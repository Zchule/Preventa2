import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-category-presale',
  templateUrl: 'category-presale.html',
})
export class CategoryPresalePage {

  typeSelected: string = 'cuidado';
  categories: any[] = [
    {
      title: 'detergente en polvo',
      image: 'https://cdn.galileo.pgsitecore.com/es-mx/-/media/Ariel_MX/Images/Products/Ariel-MB-1-kg-FT.png',
      type: 'cuidado'
    },
    {
      title: 'detergente en barra',
      image: 'https://thumbs.dreamstime.com/z/barra-detergente-17794023.jpg',
      type: 'cuidado'
    },
    {
      title: 'alimentos de soya',
      type: 'alimentos'
    },
    {
      title: 'alimentos de Quinua',
      type: 'alimentos'
    },
    {
      title: 'gaseosas',
      type: 'bebidas'
    }
  ];
  showCategories: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.showCategories = this.getCategories();
  }

  goToProductsPresalePage(){
    this.navCtrl.push('ProductsPresalePage');
  }

  segmentChanged( event ){
    this.typeSelected = event.value;
    this.showCategories = this.getCategories();
  }

  private getCategories(){
    return this.categories.filter(item =>{
      return item.type == this.typeSelected;
    });
  }

}
