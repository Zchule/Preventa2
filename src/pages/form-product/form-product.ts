import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams,ToastController } from 'ionic-angular';

import { ProductService } from '../../providers/product-service';


@IonicPage()
@Component({
  selector: 'page-form-product',
  templateUrl: 'form-product.html',
})
export class FormProductPage {

  productForm: FormGroup;
  product: any= null;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public productService: ProductService,

  ) {
    this.productForm = this.makeForm(); 
    this.product = this.navParams.get('product');
    if(this.product !== null &&  this.product !==  undefined){
      this.productForm.patchValue(this.product);
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FormProduct');
  }
  saveProduct( event: Event ){
    event.preventDefault();
    if(this.product !== null &&  this.product !==  undefined){
      this.productService.update(this.product.$key, this.productForm.value);
      let message = this.toastCtrl.create({
      message: 'Producto Guardado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
    }else{
      this.productService.create(this.productForm.value);
      let message = this.toastCtrl.create({
      message: 'Producto Actualizado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
    }
    this.productForm = this.makeForm();
    
  }
  

makeForm(){
  return this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.maxLength(5)]],
      cant: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.maxLength(3)]],
    });
}

  close(){
    this.viewCtrl.dismiss();
  }

}
