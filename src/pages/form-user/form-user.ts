import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams, ToastController} from 'ionic-angular';

import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-form-user',
  templateUrl: 'form-user.html',
})
export class FormUserPage {

  userForm: FormGroup;
  user: any= null;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public userService: UserService,

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
  saveUser( event: Event ){
    event.preventDefault();
    if(this.user !== null &&  this.user !==  undefined){
      this.userService.update(this.user.$key, this.userForm.value);
      let message = this.toastCtrl.create({
      message: 'Usuario Actualizado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
    }else{
      this.userService.create(this.userForm.value);
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
      ci: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      direction: ['', [Validators.required]],
      type: ['preventa', [Validators.required]]
    });
  }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
