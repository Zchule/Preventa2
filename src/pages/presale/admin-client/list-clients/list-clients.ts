import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';
import { ClientService } from '../../../../providers/client.service';

@IonicPage()
@Component({
  selector: 'page-lists-clients',
  templateUrl: 'list-clients.html',
})
export class ListsClientsPage {

  clientsBackup: any[] = [];
  clientsShow: any[] = [];
  zone: string;
  
  constructor(
    private navCtrl: NavController,
    private clientService: ClientService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private loadCtrl: LoadingController,
    private navParams: NavParams
  ) {
    this.zone = this.navParams.get('zone') || 'Norte';
  }

  ionViewDidLoad() {
    let load = this.loadCtrl.create({
      content: 'Cargando...'
    });
    load.present();

    this.clientService.getClientsByZone(this.zone)
    .then((clients:any[]) =>{
      this.clientsShow = this.clientsBackup = clients.map(item =>{
        item.fullName = `${item.name} ${item.apPat} ${item.apMat}`;
        return item;
      })
      .sort((a,b)=>{
        if (a.fullName > b.fullName) {
          return 1;
        }
        if (a.fullName < b.fullName) {
          return -1;
        }
        return 0;
      })
      load.dismiss(); 
    })
    .catch(error =>{
      load.dismiss();
    });
  }

  search(event: any){
    if(event.target && event.target.value){
      let query = event.target.value.trim();
      this.clientsShow = this.clientsBackup.filter(item => {
        return item.fullName.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      });
    }else{
      this.clientsShow = this.clientsBackup;
    }
  }

  goToClient(client){
    let modal = this.modalCtrl.create('ViewClientPage',{
      client:client
    });
    modal.present();

  }

  addClient(){
    let modal = this.modalCtrl.create('CreateClientPage');
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
          text: 'Modificar',
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
          icon: 'close',
          handler: ()=>{
            console.log('cancel');
          }
        }
      ]
    });
    actionSheet.present();
  }

  goToMapClientsPage(){
    this.navCtrl.push('MapClientsPage',{
      zone: this.zone
    });
  }

}
