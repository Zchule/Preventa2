import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams,ToastController, AlertController } from 'ionic-angular';

import { ProductService } from '../../../../providers/product.service';
import { TypeProductsService } from '../../../../providers/typeProducts';
import { GroupProductsService } from '../../../../providers/groupProducts';
import { MarkProductsService } from '../../../../providers/markProducts';
import { CategoryProductsService } from '../../../../providers/categoryProducts';

import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {

  productForm: FormGroup;
  product: any= null;
  image: string = null;
  types: any = [];
  categories: any = [];
  marks: any = [];
  groups: any = [];
  
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public productService: ProductService,
    public camera: Camera,
    public alertCtrl: AlertController,
    public typeProductsService: TypeProductsService,
    public categoryProductService: CategoryProductsService,
    public markProductService: MarkProductsService,
    public groupProductService: GroupProductsService  
    ) {
    this.productForm = this.makeForm(); 
    this.types = this.typeProductsService.getAll();
    this.categories = this.categoryProductService.getAll();
    this.marks = this.markProductService.getAll();
    this.groups = this.groupProductService.getAll();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FormProduct');
  }
  
  saveProduct( event: Event ){
      event.preventDefault();
      this.productService.create(this.productForm.value);
      let message = this.toastCtrl.create({
      message: 'Producto Creado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
    this.productForm = this.makeForm();
    
  }

   takePicture(){
    let options: CameraOptions = {
       quality: 100,
       destinationType: this.camera.DestinationType.DATA_URL,
       sourceType: this.camera.PictureSourceType.CAMERA,
       allowEdit: true,
       targetWidth: 500,
       targetHeight: 500
     }
     this.camera.getPicture( options )
     .then(imageBase64 =>{
       this.productForm.get('photo').setValue('data:image/jpeg;base64,' + imageBase64);
     })
     .catch(error =>{
       console.error( error );
     });
   }

   takeLibrary(){
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture( options )
    .then(imageBase64 =>{
      this.productForm.get('photo').setValue('data:image/jpeg;base64,' + imageBase64);
    })
    .catch(error =>{
      console.error( error );
    });
  }

  addType(){
    let alert = this.alertCtrl.create({
    title: 'Tipo',
    inputs: [
      {
        name: 'name',
        placeholder: 'Crear Tipo'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
     },
     {
          text: 'Agregar',
          handler: data =>{
            console.log( data );
            this.typeProductsService.create(data);
          }
      }
    ]
  });
  alert.present();
}

addCategory(){
    let alert = this.alertCtrl.create({
    title: 'Categoria',
    inputs: [
      {
        name: 'name',
        placeholder: 'Crear Categoria'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
     },
     {
          text: 'Agregar',
          handler: data =>{
            console.log( data );
            this.categoryProductService.create(data);
          }
      }
    ]
  });
  alert.present();
}

addMark(){
    let alert = this.alertCtrl.create({
    title: 'Marca',
    inputs: [
      {
        name: 'name',
        placeholder: 'Crear Marca'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
     },
     {
          text: 'Agregar',
          handler: data =>{
            console.log( data );
            this.markProductService.create(data);
          }
      }
    ]
  });
  alert.present();
}

addGroup(){
    let alert = this.alertCtrl.create({
    title: 'Grupo',
    inputs: [
      {
        name: 'name',
        placeholder: 'Crear Grupo'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
     },
     {
          text: 'Agregar',
          handler: data =>{
            console.log( data );
            this.groupProductService.create(data);
          }
      }
    ]
  });
  alert.present();
  }
  
makeForm(){
  return this.formBuilder.group({
      type: ['Cuidado', [Validators.required]],
      category: ['Detergente en Polvo', [Validators.required]],
      mark: ['Omo', [Validators.required]],
      group: ['limon', [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.maxLength(5)]],
      cant: ['', [Validators.required]],
      wheight: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.maxLength(3)]],
      photo: ['assets/imgs/papas.gif', [Validators.required]]
    });
}

  close(){
    this.viewCtrl.dismiss();
  }

}
