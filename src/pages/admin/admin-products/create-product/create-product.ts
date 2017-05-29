import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams,ToastController } from 'ionic-angular';

import { ProductService } from '../../../../providers/product.service';

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

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public productService: ProductService,
    public camera: Camera   
    ) {
    this.productForm = this.makeForm(); 
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FormProduct');
  }
  saveProduct( event: Event ){
    event.preventDefault();
      this.productService.create(this.productForm.value);
      let message = this.toastCtrl.create({
      message: 'Producto Actualizado',
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
  
makeForm(){
  return this.formBuilder.group({
      type: ['cuidado', [Validators.required]],
      category: ['polvo', [Validators.required]],
      mark: ['omo', [Validators.required]],
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
