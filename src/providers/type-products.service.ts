import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable,  } from 'angularfire2/database';

@Injectable()
export class TypeProductsService {

  typeProducts: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase
  ) {
    this.typeProducts = this.fireDatabase.list('/typeProducts');
  }

  getAll(){
    return this.typeProducts;
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