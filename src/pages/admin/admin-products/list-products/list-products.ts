import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, ModalController, ActionSheetController, LoadingController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { ProductService } from '../../../../providers/product.service';

@IonicPage()
@Component({
  selector: 'page-list-products',
  templateUrl: 'list-products.html',
})
export class ListProductsPage {

  products: FirebaseListObservable<any>;

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
    this.productService.getAll()
    .subscribe(products=>{
      this.products = products;
      load.dismiss(); 
    }); 
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

  goToEdit(product){
    console.log(product);
    let modal2 = this.modalCtrl.create('EditProductPage',{
      product:product
    });
    modal2.present();
  }

  private deleteProduct(product: any){
    this.productService.delete( product.$key );
  }

   showAlertDelete( product: any){
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
            this.deleteProduct( product );
          }
        },
      ]
    });
    alert.present();
  }

  showActionSheet(product: any){
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
            this.goToEdit(product);
          }
        },
        {
          text: 'Eliminar',
          icon:'trash',
          role: 'destructive',
          handler: ()=>{
            this.showAlertDelete(product);
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

}
