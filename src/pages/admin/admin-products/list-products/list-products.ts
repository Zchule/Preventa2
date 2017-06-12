import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ModalController, ActionSheetController, LoadingController } from 'ionic-angular';

import { ProductService } from '../../../../providers/product.service';

@IonicPage()
@Component({
  selector: 'page-list-products',
  templateUrl: 'list-products.html',
})
export class ListProductsPage {

  products: any[] = [];
  page: number = 0;
  shownInfinite: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public loadCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    let load = this.loadCtrl.create({
      content: 'Cargando...'
    });
    load.present();
    this.productService.getProducts()
    .then(products=>{
      this.products = products;
      load.dismiss(); 
    })
    .catch(error =>{
      load.dismiss();
      console.log(error);
    })
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuPreventa');
    this.menuCtrl.enable(true,'menuUser')
  }

  goToProduct(product){
    let modal = this.modalCtrl.create('ViewProductPage',{
      product:product
    });
    modal.present();

  }
  
  addProduct(){
    let modal = this.modalCtrl.create('CreateProductPage');
    modal.present();
  }

  goToEdit(product: any, index: number){
    console.log(product);
    let modal2 = this.modalCtrl.create('EditProductPage',{
      product:product,
      index: index
    });
    modal2.present();
    modal2.onDidDismiss(data=>{
      if(data !== null && data!== undefined){
        console.log(data);
        this.products[index] = data;
      }
    })
  }

  private deleteProduct(product: any, index: number){
    this.productService.delete( product.key ).then(()=>{
      this.products.splice(index, 1);
    });
  }

   showAlertDelete( product: any, index: number){
    let alert = this.alertCtrl.create({
      title: '¿Estás seguro?',
      message: 'El producto se eliminara',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('cancelar');
          }
        },
        {
          text: 'Si, estoy seguro',
          handler: ()=>{
            this.deleteProduct( product, index );
          }
        }
      ]
    });
    alert.present();
  }

  showActionSheet(product: any, index: number){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Ver',
          icon: 'md-contact',
          handler: ()=>{
            this.goToProduct(product);
          }
        },
        {
          text: 'Modificar',
          icon: 'create',
          handler: ()=>{
            this.goToEdit(product, index);
          }
        },
        {
          text: 'Eliminar',
          icon:'trash',
          role: 'destructive',
          handler: ()=>{
            this.showAlertDelete(product, index);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('cancel');
          }
        }
      ]
    });
    actionSheet.present();
  }

  doInfinite(infiniteScroll){
    this.page++;
    let id = this.products[this.products.length -1].key;
    this.productService.getProductsByPage(id)
    .then((products:any[])=>{
      products.forEach(item =>{
        this.products.push(item);
      });
      infiniteScroll.complete();
    })
    .catch(error =>{
      this.shownInfinite = false;
    })
  }

}
