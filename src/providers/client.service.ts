import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ClientService {

  clients: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase
    ) {
    this.clients = this.fireDatabase.list('/clientes');
    
  }
  getAll(){
    return this.clients;
  }

  create(client){
    this.clients.push(client);
  }

  update(key, client){
    return this.fireDatabase.object('/clientes/'+ key).set(client);
  }

  delete(key){
    return this.clients.remove(key);
  }
}
