import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { ClientService } from '../../../../providers/client.service';

@IonicPage()
@Component({
  selector: 'page-view-client',
  templateUrl: 'view-client.html',
})
export class ViewClientPage {

  clientForm: FormGroup;
  client: any= null;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public clientService: ClientService    
    ) {
      this.clientForm = this.makeForm();
      this.client = this.navParams.get('client');
      if(this.client !== null &&  this.client !==  undefined){
      this.clientForm.patchValue(this.client);
      this.clientForm.disabled;
      console.log(this.client);
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewClient');
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
      typeStore: ['agencia'],
      zone: ['norte'],
      facName: ['', [Validators.required]],
      facNit: ['', [Validators.required]]
    });
  }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
