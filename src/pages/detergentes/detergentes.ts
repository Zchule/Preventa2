import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetersService } from '../../providers/deter-service';

@IonicPage()
@Component({
  selector: 'page-detergentes',
  templateUrl: 'detergentes.html',
})
export class DetergentesPage {

  detergentes: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public deterService: DetersService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Detergentes');
    this.detergentes = this.deterService.getAllProduct();
    console.log(this.detergentes);
  }
  goToDeterCategoryPage(detergente){
    this.navCtrl.push('DeterCategoryPage', {
      detergente: detergente,
    });
  }

}
