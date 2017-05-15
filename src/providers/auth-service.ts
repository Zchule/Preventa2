import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthService {

  public fireAuth: any;
  public userData: any;

  constructor(
    
  ) 
  {
    console.log('Hello AuthService Provider');
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userProfiles');

        firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      } 
    });
    var userA = firebase.auth().currentUser;
    console.log(userA);
  }

  doLogin(email: string, password: string): any {
  return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, role: string): any {
   return this.fireAuth.createUserWithEmailAndPassword(email, password)
     .then((newUser) => {
       this.userData.child(newUser.uid).set({email: email, role: role});
     });
   }

   getProfile(id: string){
    return firebase.database().ref('/userProfiles/'+ id);
    
   }

   //holaaaa......
  // resetPassword(email: string): any {
  // return this.fireAuth.sendPasswordResetEmail(email);
  // }

  doLogout(): any {
  return this.fireAuth.signOut();
  }

}
