import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-product',
  templateUrl: 'view-product.html',
})
export class ViewProductPage {

  product: any = null;
  image: string = null;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.product = this.navParams.get('product');
  }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
