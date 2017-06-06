import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';

import { ProductService } from '../../../../providers/product.service';
import { TypeProductsService } from '../../../../providers/type-products.service';
import { MarkProductsService } from '../../../../providers/mark-products.service';
import { CategoryProductsService } from '../../../../providers/category-products.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {

  productForm: FormGroup;
  product: any = null;
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
  }

  ionViewDidLoad() {
    let load = this.loadCtrl.create();
    load.present();
    this.getAllData()
    .subscribe(response =>{
      this.types = response[0];
      this.categories = response[1];
      this.marks = response[2];
      this.productForm.patchValue({
        type: this.types[0].value,
        category: this.categories[0].value,
        mark: this.marks[0].value,
      });
      load.dismiss();
    }, error=>{
      load.dismiss();
    })
  }

  saveProduct(event: Event) {
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

  takePicture() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture(options)
      .then(imageBase64 => {
        this.productForm.get('photo').setValue('data:image/jpeg;base64,' + imageBase64);
      })
      .catch(error => {
        console.error(error);
      });
  }

  takeLibrary() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500
    }
    this.camera.getPicture(options)
      .then(imageBase64 => {
        this.productForm.get('photo').setValue('data:image/jpeg;base64,' + imageBase64);
      })
      .catch(error => {
        console.error(error);
      });
  }

  addType() {

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
          handler: data => {
            console.log(data);
            this.typeProductsService.create({
              name: data.name,
              value: data.name.replace(/ /g, "").toLowerCase()
            });
          }
        }
      ]
    });
    alert.present();
  }

  addCategory() {
    let type = this.productForm.value.type;
    console.log(type);
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
          handler: data => {
            console.log(data);
            this.categoryProductService.create({
              name: data.name,
              type: type,
              value: data.name.replace(/ /g, "").toLowerCase()
            });
          }
        }
      ]
    });
    alert.present();
  }

  addMark() {
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
          handler: data => {
            console.log(data);
            this.markProductService.create({
              data: data.name,
              value: data.name.replace(/ /g, "").toLowerCase()
            });
          }
        }
      ]
    });
    alert.present();
  }

  makeForm() {
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

  close() {
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
