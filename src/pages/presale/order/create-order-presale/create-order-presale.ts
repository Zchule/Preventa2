import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { OrderService } from '../../../../providers/order.service';
import { ClientService } from '../../../../providers/client.service';

@IonicPage()
@Component({
  selector: 'page-create-order-presale',
  templateUrl: 'create-order-presale.html',
})
export class CreateOrderPresalePage {

  orderForm: FormGroup;
  clients: any[] = [];
  zone: string;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private clientService: ClientService,
    private alertCtrl: AlertController,
    private navParams: NavParams
  ) {
    this.orderForm = this.makeLoginForm();
    this.zone = this.navParams.get('zone') || 'Norte';
  }

  ionViewDidLoad(){
    let load = this.loadCtrl.create();
    load.present();
    this.clientService.getClientsByZone(this.zone)
    .then((clients:any[]) =>{
      load.dismiss();
      this.clients = clients;
    })
    .catch(()=>{
      load.dismiss();
    });
  }

  checkClient(event){
    event.preventDefault();
    let client = this.orderForm.value.client;
    let load = this.loadCtrl.create({
      content: 'Verficando cliente'
    });
    load.present();
    this.orderService.getOrderByClient(client.codClient)
    .then((clients: any[]) =>{
      load.dismiss();
      if(clients.length > 0){
        let alert = this.alertCtrl.create({
          title: 'Ateción',
          message: 'Este cliente ya tiene un pedido, deseas continuar con el pedido creado',
          buttons:[
            {
              text: 'Aceptar',
              handler: ()=>{
                this.conitnueOrder(clients[0].key);
              }
            },
            {
              text: 'Cancelar',
              handler: ()=>{
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }else{
        this.createOrder();
      }
    })
  }

  conitnueOrder(key){
    this.navCtrl.push('CategoryPresalePage',{
      order: key
    });
  }

  createOrder(){
    event.preventDefault();
    let client = this.orderForm.value.client;
    let load = this.loadCtrl.create({
      content: 'Creando pedido'
    });
    load.present();
    this.orderService.createOrder({
      date: new Date().getTime(),
      type: this.orderForm.value.type,
      client: client,
      zone: client.zone || '',
      codClient: client.codClient,
      state: 'init',
      products: []
    })
    .then(order =>{
      load.dismiss();
      load.onDidDismiss(()=>{
        this.navCtrl.push('CategoryPresalePage',{
          order: order.key
        });
      })
    })
    .catch(error =>{
      console.error(error);
      load.dismiss();
    });
  }
  
  private makeLoginForm(){
    return this.formBuilder.group({
      client: ['', [Validators.required]],
      type: ['payment', [Validators.required]]
    });
  }
}
