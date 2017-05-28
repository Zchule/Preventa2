import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ModalController, AlertController, ActionSheetController, MenuController  } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { UserProfileService } from '../../../../providers/user-profile.service';

@IonicPage()
@Component({
  selector: 'page-lists-users',
  templateUrl: 'list-users.html',
})
export class ListUsersPage {

  users: FirebaseListObservable<any>;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private usersService: UserProfileService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private menuCtrl: MenuController
  ) {}
  
  ionViewDidLoad() {
   this.users = this.usersService.getAll();
  }

   ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuPreventa');
    this.menuCtrl.enable(false, 'menuUser')
  }

  addUser(){
    let modal = this.modalCtrl.create('CreateUserPage');
    modal.present();
  }

  goToUser(user){
    let modal = this.modalCtrl.create('ViewUserPage',{
      user:user
    });
    modal.present();
  }

  goToEdit(user){
    let modal = this.modalCtrl.create('EditUserPage',{
      user:user
    });
    modal.present();
  }
  
  private deleteUser(user: any){
    this.usersService.delete( user.$key );
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
          icon: 'md-contact',
          handler: ()=>{
            this.goToUser(user);
          }
        },
        {
          text: 'Modificar',
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
