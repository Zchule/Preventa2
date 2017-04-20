import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuidadosPage } from './cuidados';

@NgModule({
  declarations: [
    CuidadosPage,
  ],
  imports: [
    IonicPageModule.forChild(CuidadosPage),
  ],
  exports: [
    CuidadosPage
  ]
})
export class CuidadosModule {}
