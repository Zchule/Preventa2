import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,  } from 'angularfire2/database';

@Injectable()
export class CategoryProductsService {

  categoryProducts: FirebaseListObservable<any>;
  productsRef: firebase.database.Query;

  constructor(
    public fireDatabase: AngularFireDatabase,
  ) {
    this.categoryProducts = this.fireDatabase.list('/categoryProducts');
    this.productsRef = this.categoryProducts.$ref;
  }

  getAll(){
    return this.categoryProducts;
  }
  
  create(data){
    return this.categoryProducts.push(data);
  }

  update(key, product){
    return this.fireDatabase.object('/categoryProducts/'+ key).set(product);
  }

  delete(key){
    return this.categoryProducts.remove(key);
  }

}