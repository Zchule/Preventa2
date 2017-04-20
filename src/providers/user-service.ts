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

  create(user){
    this.users.push(user);
  }

  update(key, user){
    this.users.update(key,{
      name: user.name,
      apPat: user.apPat,
      apMat: user.apMat,
      ci: user.ci,
      direction: user.direction,
      email: user.email,
      type: user.type
    });
  }
}
