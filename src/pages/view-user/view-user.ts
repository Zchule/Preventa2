import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-view-user',
  templateUrl: 'view-user.html',
})
export class ViewUserPage {

  userForm: FormGroup;
  user: any= null;

  constructor( 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public userService: UserService
    ) {

      this.userForm = this.makeForm(); 
      this.user = this.navParams.get('user');
      if(this.user !== null &&  this.user !==  undefined){
      this.userForm.patchValue(this.user);
      this.userForm.disabled;
      console.log(this.user);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewUser');
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