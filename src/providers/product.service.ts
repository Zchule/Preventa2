import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,  } from 'angularfire2/database';

import * as firebase from 'firebase';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  products: FirebaseListObservable<any>;
  productsRef: firebase.database.Query;

  constructor(
    public fireDatabase: AngularFireDatabase,
    public http: Http
  ) {
    this.products = this.fireDatabase.list('/productos');
    this.productsRef = this.products.$ref;
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

  getProductsByCategory(category: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      const query = this.productsRef.orderByChild('category').equalTo(category);
      query.once('value', snap =>{
        let data = snap.val();
        console.log(data);
        if(data === null){
          reject(data);
        }else{
          resolve(data);
        }
      })
    })
  }

  getProducts(): Promise<any>{
    return new Promise((resolve, reject)=>{
      const query = this.productsRef.orderByKey().limitToFirst(8)
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

  getProductsByPage(id: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      const query = this.productsRef.orderByKey().startAt(id).limitToFirst(8)
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
  
  create(product){
    return this.products.push(product);
  }

  update(key, product){
    return this.fireDatabase.object('/productos/'+ key).set(product);
  }

  delete(key){
    return this.products.remove(key);
  }

}
