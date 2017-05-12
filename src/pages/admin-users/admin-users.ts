import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
    ) {
  }
  
  ionViewDidLoad() {
    this.users = this.userService.getAll();
  }

  addUser(){
    let modal = this.modalCtrl.create('FormUserPage');
    modal.present();
  }
  goToUser(user){
    let modal = this.modalCtrl.create('ViewUserPage',{
      user:user
    });
    modal.present();

  }
  goToEdit(user){
    console.log(user);
    let modal = this.modalCtrl.create('FormUserPage',{
      user:user
    });
    modal.present();
  }
  
  private deleteUser(user: any){
    this.userService.delete( user.$key );
  }

  showAlertDelete( user: any){
    let alert = this.alertCtrl.create({
      title: '¿Estás seguro?',
      message: 'El usuario se eliminara',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('cancelar');
          }
        },
        {
          text: 'Si, estoy seguro',
          handler: ()=>{
            this.deleteUser( user);
          }
        },
      ]
    });
    alert.present();
  }
 
  showActionSheet(user: any){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Ver',
          icon: 'share',
          handler: ()=>{
            this.goToUser(user);
          }
        },
        {
          text: 'Editar',
          icon: 'create',
          handler: ()=>{
            this.goToEdit(user);
          }
        },
        {
          text: 'Eliminar',
          icon:'trash',
          role: 'destructive',
          handler: ()=>{
            this.showAlertDelete(user);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=>{
            console.log('cancel');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
