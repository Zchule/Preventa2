import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams,ToastController, AlertController, LoadingController } from 'ionic-angular';

import { ProductService } from '../../../../providers/product.service';
import { TypeProductsService } from '../../../../providers/type-products.service';
import { MarkProductsService } from '../../../../providers/mark-products.service';
import { CategoryProductsService } from '../../../../providers/category-products.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  productForm: FormGroup;
  product: any= null;
  index: number;
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
    private loadCtrl: LoadingController 
    ) {
    this.productForm = this.makeForm(); 
    this.product = this.navParams.get('product');
    this.index = this.navParams.get('index');
    if(this.product !== null &&  this.product !==  undefined){
      this.productForm.patchValue(this.product);
    }
  }
  
  ionViewDidLoad() {
    let load = this.loadCtrl.create();
    load.present();
    this.getAllData()
    .subscribe(response =>{
      this.types = response[0];
      this.categories = response[1];
      this.marks = response[2];
      load.dismiss();
    }, error=>{
      load.dismiss();
    })
  }
  saveProduct( event: Event ){
    let product = this.productForm.value;
    product.typeValue = product.type.value;
    product.categoryValue = product.category.value;
    product.markValue = product.mark.value;
    event.preventDefault();
      this.productService.update(this.product.key, product)
      .then(()=>{
          let message = this.toastCtrl.create({
          message: 'Producto Actualizado',
          duration: 3000,
          showCloseButton: true
        })
        message.present();
        let productMerge = Object.assign(this.product, product);
        this.viewCtrl.dismiss(productMerge);
      })
      .catch(error=>{
        console.log(error);
      });
      
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
  
makeForm(){
  return this.formBuilder.group({
      type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      mark: ['', [Validators.required]],
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

private getAllData(){
    return Observable.combineLatest(
      this.typeProductsService.getAll(),
      this.categoryProductService.getAll(),
      this.markProductService.getAll()
    )
  }

}
