import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private clientService: ClientService
  ) {
    this.orderForm = this.makeLoginForm();
  }

  ionViewDidLoad(){
    this.clientService.getAll()
    .subscribe(clients =>{
      this.clients = clients;
    });
  }

  createOrder( event: Event){
    event.preventDefault();
    let load = this.loadCtrl.create({
      content: 'Creando pedido'
    });
    load.present();
    this.orderService.createOrder({
      date: new Date().getTime(),
      type: this.orderForm.value.type,
      client: this.orderForm.value.client,
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
