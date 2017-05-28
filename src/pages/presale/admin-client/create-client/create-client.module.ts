import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormClientPage } from './form-client';

@NgModule({
  declarations: [
    FormClientPage,
  ],
  imports: [
    IonicPageModule.forChild(FormClientPage),
  ],
  exports: [
    FormClientPage
  ]
})
export class FormClientModule {}
