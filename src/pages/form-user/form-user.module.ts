import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormUserPage } from './form-user';

@NgModule({
  declarations: [
    FormUserPage,
  ],
  imports: [
    IonicPageModule.forChild(FormUserPage),
  ],
  exports: [
    FormUserPage
  ]
})
export class FormUserModule {}
