import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{

  loginForm: FormGroup;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController

  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  doLogin( event: Event ){
    event.preventDefault();
    console.log( this.loginForm.value );
      let msn="Correo invalido";
      this.authService.doLogin(this.loginForm.value.email, this.loginForm.value.password).then( authService => {
          this.navCtrl.setRoot( 'AdminHomePage' );
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              // message: error.message,
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
        });

        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
      }

}
