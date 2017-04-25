import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';

import { ClientService } from '../../providers/client-service';

@IonicPage()
@Component({
  selector: 'page-form-client',
  templateUrl: 'form-client.html',
})
export class FormClientPage {

  clientForm: FormGroup;
  client: any= null;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public clientService: ClientService,
    ) {
    
    this.clientForm = this.makeForm();   
    this.client = this.navParams.get('client');
    if(this.client !== null &&  this.client !==  undefined){
      this.clientForm.patchValue(this.client);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormClient');
  }

  saveClient( event: Event ){
    event.preventDefault();
    if(this.client !== null &&  this.client !==  undefined){
      this.clientService.update(this.client.$key, this.clientForm.value);
      let message = this.toastCtrl.create({
      message: 'Cliente Actualizado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
    }else{
      this.clientService.create(this.clientForm.value);
      let message = this.toastCtrl.create({
      message: 'Cliente Registrado',
      duration: 3000,
      showCloseButton: true
    })
    message.present();
    this.close();
    }
    this.clientForm = this.makeForm();    
  }
  makeForm(){
    return this.formBuilder.group({
      codClient: ['', [Validators.required]],
      name: ['', [Validators.required]],
      apPat: ['', [Validators.required]],
      apMat: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      nameStore: ['', [Validators.required]],
      typeStore: ['agencia', [Validators.required]],
      zone: ['norte', [Validators.required]],
      facName: ['', [Validators.required]],
      facNit: ['', [Validators.required]]
    });
  }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
