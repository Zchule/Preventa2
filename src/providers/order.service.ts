import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase';

@Injectable()
export class OrderService {

  orders: FirebaseListObservable<any>;
  ordersRef: firebase.database.Query;

  constructor(
    public fireDatabase: AngularFireDatabase
  ) {
    this.orders = this.fireDatabase.list('/orders');
    this.ordersRef = this.orders.$ref;
  }

  createOrder(order){
    return this.orders.push(order);
  }

  getOrders(){
    return this.orders;
  }

  deleteOrder(key: string){
    return this.orders.remove(key);
  }

  getOrder(id){
    return this.fireDatabase.object('/orders/'+ id);
  }

  getOrderProducts(id){
    return this.fireDatabase.list('/orders/'+ id + '/products');
  }

  getOrderClient(id){
    return this.fireDatabase.object('/orders/'+ id + '/client');
  }

  getOrderByClient(codClient: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      const query = this.ordersRef.orderByChild('codClient').equalTo(codClient);
      query.once('value', snaps =>{
        if(snaps === null){
          reject(null);
        }else{
          let products = [];
          snaps.forEach(snap =>{
            let data = snap.val();
            data.key = snap.key;
            products.push(data);
            return false;
          })
          resolve(products);
        }
      })
    })
  }

  updateOrder(id, data){
    return this.fireDatabase.object('/orders/'+ id).update(data);
  }

}
