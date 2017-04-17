import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormProductPage } from './form-product';

@NgModule({
  declarations: [
    FormProductPage,
  ],
  imports: [
    IonicPageModule.forChild(FormProductPage),
  ],
  exports: [
    FormProductPage
  ]
})
export class FormProductModule {}
