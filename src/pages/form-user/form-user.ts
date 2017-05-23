import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams, ToastController} from 'ionic-angular';

import { UserService } from '../../providers/user-service';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { AuthService } from '../../providers/auth-service';

@IonicPage()
@Component({
  selector: 'page-form-user',
  templateUrl: 'form-user.html',
})
export class FormUserPage {

  userForm: FormGroup;
  user: any = null;
  image: string = null;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public userService: UserService,
    public camera: Camera,
    public authService: AuthService
    ) {
   this.userForm = this.makeForm();   
    this.user = this.navParams.get('user');
    if(this.user !== null &&  this.user !==  undefined){
      this.userForm.patchValue(this.user);
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormUser');
  }
  isDisabled: boolean;
  saveUser( event: Event ){
    event.preventDefault();
    if(this.user !== null &&  this.user !==  undefined){
      this.authService.updateProfile(this.user.$key, this.userForm.value); 
      this.isDisabled=false;
      let message = this.toastCtrl.create({
      message: 'Usuario Actualizado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
  }else{
      let data = this.userForm.value;
      data.photo = this.image;
      if(data.photo === null){
        console.log(data.photo);
        data.photo='assets/imgs/sinfoto.png';
      }
      console.log(data.photo);
      this.authService.register(data.email,"123456", data.role, data.apPat, data.apMat, data.CI, data.direction, data.name, data.photo );
      let message = this.toastCtrl.create({
      message: 'Usuario Registrado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
    }
    this.userForm = this.makeForm();    
  }
  
 makeForm(){
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      apPat: ['', [Validators.required]],
      apMat: ['', [Validators.required]],
      CI: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      direction: ['', [Validators.required]],
      role: ['presale', [Validators.required]]
    });
  }

  takePicture(){
    //  this.image = 'assets/imgs/papas.gif';
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
       this.image = 'data:image/jpeg;base64,' + imageBase64;
     })
     .catch(error =>{
       console.error( error );
     });
   }
   takeLibrary(){
    // this.image = 'assets/imgs/papas.gif';
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
       this.image = 'data:image/jpeg;base64,' + imageBase64;
     })
     .catch(error =>{
       console.error( error );
     });
   }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
