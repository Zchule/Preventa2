import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JabonesPage } from './jabones';

@NgModule({
  declarations: [
    JabonesPage,
  ],
  imports: [
    IonicPageModule.forChild(JabonesPage),
  ],
  exports: [
    JabonesPage
  ]
})
export class JabonesModule {}
