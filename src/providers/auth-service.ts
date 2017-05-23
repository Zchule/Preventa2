import { Injectable } from '@angular/core';
import firebase from 'firebase';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class AuthService {

  public fireAuth: any;
  public userData: any;

  users: FirebaseListObservable<any>;

  constructor(
    public fireDatabase: AngularFireDatabase
  ) 
  {
    console.log('Hello AuthService Provider');
    this.users = this.fireDatabase.list('/userProfiles');
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userProfiles');

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      } 
    });
    var userLogged = firebase.auth().currentUser;
    console.log(userLogged);
}

  updateProfile(key, user){
      this.users.update(key,{
        name: user.name,
        apPat: user.apPat,
        apMat: user.apMat,
        email: user.email,
        CI: user.CI,
        direction: user.direction,
        role: user.role
      });
    }
  // updateUser(key){
  //   var user = firebase.auth().currentUser;
  //   user.providerData.forEach(function (profile) {
  //       console.log("  Provider-specific UID: "+ profile.email);
  //       console.log("  Email: "+profile.email);
  //       user.updateEmail(user.email).then(function() {
  //             console.log("cambiado");
  //           }, function(error) {
  //             console.log("error" + error);
  //           });
  //     });

  // }

  delete(key){
    return this.users.remove(key);
  }

  getAll(){
    return this.users;
  }

  doLogin(email: string, password: string): any {
  return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, role: string, apPat: string, apMat: string, CI: number, direction: string, name: string, photo: string): any {
   return this.fireAuth.createUserWithEmailAndPassword(email, password)
     .then((newUser) => {
       this.userData.child(newUser.uid).set({email: email, role: role, apPat: apPat, apMat: apMat, CI: CI, direction: direction, name: name, photo: photo});
     });
   }

   getProfile(id: string){
    return firebase.database().ref('/userProfiles/'+ id);
    
   }
   
  // resetPassword(email: string): any {
  // return this.fireAuth.sendPasswordResetEmail(email);
  // }

  doLogout(): any {
  return this.fireAuth.signOut();
  }

}
