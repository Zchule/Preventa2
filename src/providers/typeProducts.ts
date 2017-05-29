import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,  } from 'angularfire2/database';

import * as firebase from 'firebase';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TypeProductsService {

  typeProducts: FirebaseListObservable<any>;
  productsRef: firebase.database.Query;

  constructor(
    public fireDatabase: AngularFireDatabase,
    public http: Http
  ) {
    this.typeProducts = this.fireDatabase.list('/typeProducts');
    this.productsRef = this.typeProducts.$ref;
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
    return this.typeProducts;
  }

  getProductsByCategory(category: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      const query = this.productsRef.orderByChild('category').equalTo(category);
      query.once('value', snap =>{
        let data = snap.val();
        if(data === null){
          reject(data);
        }else{
          resolve(data);
        }
      })
    })
    
  }
  
  create(data){
    return this.typeProducts.push(data);
  }

  update(key, product){
    return this.fireDatabase.object('/typeProducts/'+ key).set(product);
  }

  delete(key){
    return this.typeProducts.remove(key);
  }

}