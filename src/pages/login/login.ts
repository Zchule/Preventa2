import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController
  ) {
    this.loginForm = this.makeLoginForm();
  }
  
  doLogin( event: Event ){
    event.preventDefault();

    let load = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    load.present();

    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    this.authService.doLogin(email, password)
    .catch(error=>{
      load.dismiss();
    });
  }

  private makeLoginForm(){
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}