import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  products: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase,
    public http: Http
  ) {
    this.products = this.fireDatabase.list('/productos');
  }

  getData(){
    return this.http.get('assets/json/data.json')
    .map(response => response.json())
    .toPromise();
  }

  getCategories(){
    return this.http.get('assets/json/categories.json')
    .map(response => response.json())
    .toPromise();
  }

  getMark(){
    return this.http.get('assets/json/mark.json')
    .map(response => response.json())
    .toPromise();
  }

  getGroup(){
    return this.http.get('assets/json/group.json')
    .map(response => response.json())
    .toPromise();
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
