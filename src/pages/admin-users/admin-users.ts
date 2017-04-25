import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-admin-users',
  templateUrl: 'admin-users.html',
})
export class AdminUsersPage {

  users: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public modalCtrl: ModalController,
    ) {
  }

  ionViewDidLoad() {
    this.users = this.userService.getAll();
  }

  addUser(){
    let modal = this.modalCtrl.create('FormUserPage');
    modal.present();
  }
  goToEdit(user){
    console.log(user);
    let modal2 = this.modalCtrl.create('FormUserPage',{
      user:user
    });
    modal2.present();

  }

}
