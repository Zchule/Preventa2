import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    public loadingCtrl: LoadingController,
    private storage: Storage
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
    .then(user =>{
      let pages: any = {
        'admin': 'HomeAdminPage',
        'distributor': 'HomeDistributorPage',
        'presale': 'HomePresalePage',
      };
      this.navCtrl.setRoot(pages[user.role]);
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