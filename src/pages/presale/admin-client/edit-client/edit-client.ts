import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { ClientService } from '../../../../providers/client.service';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation} from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'edit-client',
  templateUrl: 'edit-client.html',
})
export class EditClientPage {

  clientForm: FormGroup;
  client: any = null;
  image: string = null;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public clientService: ClientService,
    public camera: Camera,
    public alertCtrl: AlertController,
    public geolocation: Geolocation
    ) {
    
    this.clientForm = this.makeForm();   
    this.client = this.navParams.get('client');
    this.clientForm.patchValue(this.client);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClient');
  }

  saveClient( event: Event ){
    event.preventDefault();
      this.clientService.update(this.client.$key, this.clientForm.value)
      .then((()=>{
        let message = this.toastCtrl.create({
          message: 'Cliente Actualizado',
          duration: 3000,
          showCloseButton: true
        })
        message.present();
        // this.clientForm = this.makeForm(); 
        this.close(); 
      }))
      .catch(error=>{
        console.log(error);
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
      zone: ['Norte'],
      facName: ['', [Validators.required]],
      facNit: ['', [Validators.required]],
      photo: ['assets/imgs/sinfoto.png', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
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

  getPosition(): any {
    let msn = "No Encontramos su ubicacion, revise su internet o su Gps";
    this.geolocation.getCurrentPosition().then((position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    this.clientForm.get('latitude').setValue(position.coords.latitude);
    this.clientForm.get('longitude').setValue(position.coords.longitude);
    
  }).catch((error) => {
              let alert = this.alertCtrl.create({
               title: "ERROR GPS",
               message: msn,
               buttons: [
                 {
                   text: "Ok",
                   role: 'cancel'
                 }
               ]
             });
             alert.present();
    });
  }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
