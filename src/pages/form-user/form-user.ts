import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-form-user',
  templateUrl: 'form-user.html',
})
export class FormUserPage {

  userForm: FormGroup;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
    ) {
      this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      apPat: ['', [Validators.required]],
      apMat: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormUser');
  }
  saveUser( event: Event ){
    event.preventDefault();
    console.log( this.userForm.value );
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
