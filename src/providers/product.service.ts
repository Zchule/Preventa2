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

  getProductsByCant(cant: number): Promise<any>{
    return new Promise((resolve, reject)=>{
      const query = this.productsRef.orderByChild('cant').endAt(cant, 'cant');
      query.once('value', snaps =>{
        let products = [];
        snaps.forEach(snap =>{
          let data = snap.val();
          data.key = snap.key;
          products.push(data);
          return false;
        })
        resolve(products);
      })
    })
  }

  getProductsByCategory(category: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      const query = this.productsRef.orderByChild('categoryValue').equalTo(category);
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
          if(products.length === 1){
            reject(null);
          }else{
            products.splice(0,1)
            resolve(products);
          }
        }
      })
    })
  }
  
  create(product){
    return this.products.push(product);
  }

  update(key, product): Promise<any>{
    return new Promise((resolve, reject)=>{
      if(key !== '' && key !== null && key !== undefined){
        this.fireDatabase.object('/productos/'+ key).update(product)
        .then(()=> resolve(true))
        .catch(error => reject(error))
      }else{
        return reject(null);
      }
    });
  }

  delete(key): any{
    if(key !== '' && key !== null && key !== undefined){
      return this.products.remove(key);
    }else{
      return Promise.reject(null);
    }
  }

}
