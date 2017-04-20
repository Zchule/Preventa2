import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesodorantesPage } from './desodorantes';

@NgModule({
  declarations: [
    DesodorantesPage,
  ],
  imports: [
    IonicPageModule.forChild(DesodorantesPage),
  ],
  exports: [
    DesodorantesPage
  ]
})
export class DesodorantesModule {}
