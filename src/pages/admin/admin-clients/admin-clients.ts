import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

import { ClientService } from '../../providers/client-service';

@IonicPage()
@Component({
  selector: 'page-admin-clients',
  templateUrl: 'admin-clients.html',
})
export class AdminClientsPage {

  clients: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clientService: ClientService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController
    ) {
  }

  ionViewDidLoad() {
    this.clients = this.clientService.getAll();
  }
  addClient(){
    let modal = this.modalCtrl.create('FormClientPage');
    modal.present();
  }
  goToClient(client){
    let modal = this.modalCtrl.create('ViewClientPage',{
      client:client
    });
    modal.present();

  }
  goToEdit(client){
    console.log(client);
    let modal = this.modalCtrl.create('FormClientPage',{
      client:client
    });
    modal.present();
  }

  private deleteClient(client: any){
    this.clientService.delete( client.$key );
  }

  showAlertDelete( client: any){
    let alert = this.alertCtrl.create({
      title: '¿Estás seguro?',
      message: 'El cliente se eliminara',
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
            this.deleteClient( client );
          }
        },
      ]
    });
    alert.present();
  }

  showActionSheet(client: any){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones',
      buttons: [
        {
          text: 'Ver',
          icon: 'md-contact',
          handler: ()=>{
            this.goToClient(client);
          }
        },
        {
          text: 'Editar',
          icon: 'create',
          handler: ()=>{
            this.goToEdit(client);
          }
        },
        {
          text: 'Eliminar',
          icon:'trash',
          role: 'destructive',
          handler: ()=>{
            this.showAlertDelete(client);
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
