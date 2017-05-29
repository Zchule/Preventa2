import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams, ToastController} from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { UserProfileService } from '../../../../providers/user-profile.service';

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  userForm: FormGroup;
  image: string = null;
  user: any = null;
  
  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private camera: Camera,
    private userProfileService: UserProfileService
    ) {
      this.userForm = this.makeForm();
      this.user = this.navParams.get('user');
      this.userForm.patchValue(this.user);
      console.log(this.userForm.value);
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad EditUser');
  }
  saveUser( event: Event ){
    event.preventDefault();
    let isInputDisabled:boolean = true;
    isInputDisabled = false;
    this.userProfileService.updateProfile(this.user.$key, this.userForm.value)
    .then((()=>{
      let message = this.toastCtrl.create({
        message: 'Usuario Actualizado',
        duration: 3000,
        showCloseButton: true
      })
      message.present();
      this.userForm = this.makeForm();  
      this.close();
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
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      apPat: ['', [Validators.required]],
      apMat: ['', [Validators.required]],
      CI: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      direction: ['', [Validators.required]],
      role: ['presale', [Validators.required]],
      photo: ['assets/imgs/sinfoto.png', [Validators.required]],
    });
  }

}
