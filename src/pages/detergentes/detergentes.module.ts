import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetergentesPage } from './detergentes';

@NgModule({
  declarations: [
    DetergentesPage,
  ],
  imports: [
    IonicPageModule.forChild(DetergentesPage),
  ],
  exports: [
    DetergentesPage
  ]
})
export class DetergentesModule {}
