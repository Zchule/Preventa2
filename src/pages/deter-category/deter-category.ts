import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-deter-category',
  templateUrl: 'deter-category.html',
})
export class DeterCategoryPage {

  detergente: any = {};
  deterCategory: any[] = [];
  backupDeteCategory: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    ) {
      this.detergente = this.navParams.get('detergente');
      this.backupDeteCategory = this.deterCategory = this.detergente.deterCategory;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeterCategory');
  }

}
