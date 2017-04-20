import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCategory2Page } from './list-category2';

@NgModule({
  declarations: [
    ListCategory2Page,
  ],
  imports: [
    IonicPageModule.forChild(ListCategory2Page),
  ],
  exports: [
    ListCategory2Page
  ]
})
export class ListCategory2Module {}
