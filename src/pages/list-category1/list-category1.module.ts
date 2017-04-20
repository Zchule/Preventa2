import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListCategory1Page } from './list-category1';

@NgModule({
  declarations: [
    ListCategory1Page,
  ],
  imports: [
    IonicPageModule.forChild(ListCategory1Page),
  ],
  exports: [
    ListCategory1Page
  ]
})
export class ListCategory1Module {}
