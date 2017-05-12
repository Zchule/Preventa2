import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminMarksPage} from './admin-marks';

@NgModule({
  declarations: [
    AdminMarksPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminMarksPage),
  ],
  exports: [
    AdminMarksPage
  ]
})
export class AdminMarksModule {}
