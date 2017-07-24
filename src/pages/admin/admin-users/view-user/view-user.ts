import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-user',
  templateUrl: 'view-user.html',
})
export class ViewUserPage {

  user: any = null;
  image: string = null;

  constructor( 
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
      this.user = this.navParams.get('user');
    }
  
  close(){
    this.viewCtrl.dismiss();
  }

}
