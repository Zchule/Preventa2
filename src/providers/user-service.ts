import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class UserService {

  users: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase
  ) {
    this.users = this.fireDatabase.list('/users');
  }
  
  getAll(){
    return this.users;
  }

}
