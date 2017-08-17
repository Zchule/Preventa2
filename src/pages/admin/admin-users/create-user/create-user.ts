import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, ViewController, ToastController} from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { UserProfileService } from '../../../../providers/user-profile.service';

@IonicPage()
@Component({
  selector: 'create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {

  userForm: FormGroup;
  image: string = null;
  roleField: FormControl;
  zoneField: FormControl;

  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private camera: Camera,
    private userProfileService: UserProfileService
  ) {
    this.makeForm();  
  }

  ionViewDidLoad() {}

  saveUser( event: Event ){
    event.preventDefault();
    let data = this.userForm.value;
    this.userProfileService.createProfile(data.email,"123456", data.role, data.apPat, data.apMat, data.CI, data.direction, data.name, data.photo )
    .then((()=>{
      let message = this.toastCtrl.create({
        message: 'Usuario Registrado',
        duration: 3000,
        showCloseButton: true
      })
      message.present();
      message.onDidDismiss(()=>{
        this.close();
      })
    }))
    .catch(error =>{
      console.error(error);
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
      this.userForm.get('photo').setValue('data:image/jpeg;base64,' + imageBase64);
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
      this.userForm.get('photo').setValue('data:image/jpeg;base64,' + imageBase64);
    })
    .catch(error =>{
      console.error( error );
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }
  
  private makeForm(){

    this.zoneField = new FormControl('');
    this.roleField = new FormControl('presale', [Validators.required]);

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      apPat: ['', [Validators.required]],
      apMat: ['', [Validators.required]],
      CI: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      direction: ['', [Validators.required]],
      role: ['presale', [Validators.required]],
      photo: ['assets/imgs/sinfoto.png', [Validators.required]]
    });
  }

}