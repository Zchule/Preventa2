import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class UserProfileService {

  users: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase,
    private fireAuth: AngularFireAuth
  ) {
    this.users = this.fireDatabase.list('/users');
  }

  createUser(email: string, password: string, role: string, apPat: string, apMat: string, CI: number, direction: string, name: string, photo: string): any {
   return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((newUser) => {
       return this.fireDatabase
       .object('/userProfiles/'+newUser.uid)
       .set({
         email: email,
         role: role,
         apPat: apPat,
         apMat: apMat,
         CI: CI,
         direction: direction,
         name: name,
         photo: photo
      });
     })
     .catch(error => Promise.reject(error))
   }

  update(key, user){
    return this.fireDatabase.object('/userProfiles/'+key).set({
      name: user.name,
      apPat: user.apPat,
      apMat: user.apMat,
      email: user.email,
      CI: user.CI,
      direction: user.direction,
      role: user.role
    });
  }

  delete(key){
    return this.users.remove(key);
  }

  getAll(){
    return this.users;
  }
}
