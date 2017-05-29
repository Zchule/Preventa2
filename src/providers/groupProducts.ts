import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,  } from 'angularfire2/database';

import * as firebase from 'firebase';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GroupProductsService {

  groupProducts: FirebaseListObservable<any>;
  productsRef: firebase.database.Query;

  constructor(
    public fireDatabase: AngularFireDatabase,
    public http: Http
  ) {
    this.groupProducts = this.fireDatabase.list('/groupProducts');
    this.productsRef = this.groupProducts.$ref;
  }

  getAll(){
    return this.groupProducts;
  }
  
  create(type){
    return this.groupProducts.push(type);
  }

  update(key, product){
    return this.fireDatabase.object('/groupProducts/'+ key).set(product);
  }

  delete(key){
    return this.groupProducts.remove(key);
  }

}