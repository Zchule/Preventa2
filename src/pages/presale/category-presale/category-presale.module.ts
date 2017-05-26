import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPresalePage } from './category-presale';

@NgModule({
  declarations: [
    CategoryPresalePage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPresalePage),
  ],
  exports: [
    CategoryPresalePage
  ]
})
export class CategoryPresalePageModule {}
