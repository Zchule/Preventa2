import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../../providers/auth.service'; 


@IonicPage()
@Component({
  selector: 'page-home-distributor',
  templateUrl: 'home-distributor.html',
})
export class HomeDistributorPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthService
  ) {}

  logout() {
    this.authService.doLogout();
  }

}
