import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoyaPage } from './soya';

@NgModule({
  declarations: [
    SoyaPage,
  ],
  imports: [
    IonicPageModule.forChild(SoyaPage),
  ],
  exports: [
    SoyaPage
  ]
})
export class SoyaModule {}
