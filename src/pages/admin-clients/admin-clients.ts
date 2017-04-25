import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
    public modalCtrl: ModalController
    ) {
  }

  ionViewDidLoad() {
    this.clients = this.clientService.getAll();
    console.log(this.clients);
  }
  addClient(){
    let modal = this.modalCtrl.create('FormClientPage');
    modal.present();
  }
  goToEdit(client){
    console.log(client);
    let modal2 = this.modalCtrl.create('FormClientPage',{
      client:client
    });
    modal2.present();

  }

}
