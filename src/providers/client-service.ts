import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ClientService {

  clients: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase
    ) {
    console.log('Hello ClientService Provider');
    this.clients = this.fireDatabase.list('/clientes');
    
  }
  getAll(){
    return this.clients;
  }

  create(client){
    this.clients.push(client);
  }

  update(key, client){
    this.clients.update(key,{
      codClient: client.codClient,
      name: client.name,
      apPat: client.apPat,
      apMat: client.apMat,
      CI: client.CI,
      direction: client.direction,
      nameStore: client.nameStore,
      zone: client.zone,
      typeStore: client.typeStore,
      facName: client.facName,
      facNit: client.facNit
    });
  }

  delete(key){
    return this.clients.remove(key);
  }
}
