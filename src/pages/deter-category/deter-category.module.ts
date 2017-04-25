import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeterCategoryPage } from './deter-category';

@NgModule({
  declarations: [
    DeterCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DeterCategoryPage),
  ],
  exports: [
    DeterCategoryPage
  ]
})
export class DeterCategoryModule {}
