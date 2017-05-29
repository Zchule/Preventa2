import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ClientService } from '../../../../providers/client-service';

import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'create-client',
  templateUrl: 'create-client.html',
})
export class CreateClientPage {

  clientForm: FormGroup;
  client: any= null;
  image: string = null;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public clientService: ClientService,
    public camera: Camera
    ) {
    this.clientForm = this.makeForm();     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormClient');
  }

  saveClient( event: Event ){
    event.preventDefault();
      let data = this.clientForm.value; 
      this.clientService.create(data);
      let message = this.toastCtrl.create({
      message: 'Cliente Registrado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
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
       this.clientForm.get('photo').setValue('data:image/jpeg;base64,' + imageBase64);
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
      this.clientForm.get('photo').setValue('data:image/jpeg;base64,' + imageBase64);
    })
    .catch(error =>{
      console.error( error );
    });
  }
  
   makeForm(){
    return this.formBuilder.group({
      codClient: ['', [Validators.required]],
      name: ['', [Validators.required]],
      apPat: ['', [Validators.required]],
      apMat: ['', [Validators.required]],
      CI: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      nameStore: ['', [Validators.required]],
      typeStore: ['agency'],
      zone: ['north'],
      facName: ['', [Validators.required]],
      facNit: ['', [Validators.required]],
      photo: ['assets/imgs/sinfoto.png', [Validators.required]],
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
