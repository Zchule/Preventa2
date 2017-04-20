import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsCategoryPage } from './tabs-category';

@NgModule({
  declarations: [
    TabsCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsCategoryPage),
  ],
  exports: [
    TabsCategoryPage
  ]
})
export class TabsCategoryModule {}
