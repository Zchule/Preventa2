import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-form-product',
  templateUrl: 'form-product.html',
})
export class FormProductPage {

  productForm: FormGroup;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      cant: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormProduct');
  }
  saveProduct( event: Event ){
    event.preventDefault();
    console.log( this.productForm.value );
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
