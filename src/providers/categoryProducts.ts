import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,  } from 'angularfire2/database';

import * as firebase from 'firebase';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoryProductsService {

  categoryProducts: FirebaseListObservable<any>;
  productsRef: firebase.database.Query;

  constructor(
    public fireDatabase: AngularFireDatabase,
    public http: Http
  ) {
    this.categoryProducts = this.fireDatabase.list('/categoryProducts');
    this.productsRef = this.categoryProducts.$ref;
  }

  getAll(){
    return this.categoryProducts;
  }
  
  create(type){
    return this.categoryProducts.push(type);
  }

  update(key, product){
    return this.fireDatabase.object('/categoryProducts/'+ key).set(product);
  }

  delete(key){
    return this.categoryProducts.remove(key);
  }

}