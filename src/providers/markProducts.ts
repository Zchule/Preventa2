import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,  } from 'angularfire2/database';

import * as firebase from 'firebase';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MarkProductsService {

  markProducts: FirebaseListObservable<any>;
  productsRef: firebase.database.Query;

  constructor(
    public fireDatabase: AngularFireDatabase,
    public http: Http
  ) {
    this.markProducts = this.fireDatabase.list('/markProducts');
    this.productsRef = this.markProducts.$ref;
  }

  getAll(){
    return this.markProducts;
  }
  
  create(type){
    return this.markProducts.push(type);
  }

  update(key, product){
    return this.fireDatabase.object('/markProducts/'+ key).set(product);
  }

  delete(key){
    return this.markProducts.remove(key);
  }

}