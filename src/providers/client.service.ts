import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ClientService {

  clients: FirebaseListObservable<any>;
  clientsRef: firebase.database.Query;

  constructor(
    public fireDatabase: AngularFireDatabase
  ) {
    this.clients = this.fireDatabase.list('/clientes');
    this.clientsRef = this.clients.$ref;
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

  getClientsByZone(zone: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      const query = this.clientsRef.orderByChild('zone').equalTo(zone);
      query.once('value', snap =>{
        let clients = [];
        snap.forEach(item => {
          let data = item.val();
          data.key = item.key;
          clients.push(data);
          return false;
        });
        if(clients === null){
          reject(clients);
        }else{
          resolve(clients);
        }
      })
    })
  }
}
