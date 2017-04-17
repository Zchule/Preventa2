import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ProductService {

  products: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase
  ) {
    this.products = this.fireDatabase.list('/productos');
  }

  getAll(){
    return this.products;
  }

}
