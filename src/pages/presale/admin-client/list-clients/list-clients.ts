import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ModalController, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';

import { ClientService } from '../../../../providers/client.service';

@IonicPage()
@Component({
  selector: 'page-lists-clients',
  templateUrl: 'list-clients.html',
})
export class ListsClientsPage {

  clients: FirebaseListObservable<any>;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private clientService: ClientService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private loadCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    let load = this.loadCtrl.create({
      content: 'Cargando...'
    });
    load.present();
    this.clientService.getAll()
    .subscribe(clients=>{
      this.clients = clients;
      load.dismiss(); 
    });   
  }
  addClient(){
    let modal = this.modalCtrl.create('CreateClientPage');
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
    let modal = this.modalCtrl.create('EditClientPage',{
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
          icon: 'contact',
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

  goToMapClientsPage(){
    this.navCtrl.push('MapClientsPage');
  }

}
