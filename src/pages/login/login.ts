import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';
import { OneSignal } from '@ionic-native/onesignal';

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
    public loadingCtrl: LoadingController,
    private oneSignal: OneSignal,
    private platform: Platform
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
    .then(user => {
      if(this.platform.is('cordova')){
        this.oneSignal.sendTag('role', user.role);
      }
      this.navCtrl.setRoot(user.page);
    })
    .catch(error=>{
      load.dismiss().then( () => {
      let alert = this.alertCtrl.create({
        title: "Datos Invalidos",
        message: "Revise sus Datos",
        buttons: [{
          text: "Ok",
          role: 'cancel'
        }]
      });
      alert.present();
    });
    });
  }

  private makeLoginForm(){
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}