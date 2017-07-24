import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams, ToastController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { ProductService } from '../../../../providers/product.service';

@IonicPage()
@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {

  product: any = null;
  image: string = null;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public productService: ProductService,
    public camera: Camera
    ) {
    this.product = this.navParams.get('product');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FormProduct');
  }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
