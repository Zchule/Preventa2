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
  
  create(product){
    this.products.push(product);
  }

  update(key, product){
    this.products.update(key,{
      name: product.name,
      code: product.code,
      cant: product.cant,
      price: product.price
    });
  }

}
