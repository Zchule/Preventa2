import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class OrderService {

  orders: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase
  ) {
    this.orders = this.fireDatabase.list('/orders');
  }

  createOrder(order){
    return this.orders.push(order);
  }

  getOrder(id){
    return this.fireDatabase.object('/orders/'+ id);
  }

  getProducstOrder(id){
    return this.fireDatabase.list('/orders/'+ id + '/products');
  }

  updateOrder(id, data){
    return this.fireDatabase.object('/orders/'+ id).update(data);
  }

}
