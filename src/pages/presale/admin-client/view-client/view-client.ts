import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-view-client',
  templateUrl: 'view-client.html',
})
export class ViewClientPage {

  client: any = null;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController  
  ) {
    this.client = this.navParams.get('client');
  }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
