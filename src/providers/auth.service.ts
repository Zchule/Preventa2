import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth,
    private fireDatabase: AngularFireDatabase
  ){}

  doLogin(email: string, password: string): firebase.Promise<any> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  getProfile(id: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      this.fireDatabase.object('/userProfiles/'+ id)
      .subscribe(data =>{
        resolve(data);
      },error=>{
        reject(error)
      })
    })
  }

  doLogout(): any {
    return this.fireAuth.auth.signOut();
  }
  

}
