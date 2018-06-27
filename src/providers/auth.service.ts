import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  userState: BehaviorSubject<any>;

  constructor(
    public fireAuth: AngularFireAuth,
    private fireDatabase: AngularFireDatabase
  ){
    this.userState = new BehaviorSubject(this.getUser());
  }

  doLogin(email: string, password: string): firebase.Promise<any> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then( user => this.getProfile(user.uid) )
    .then( user => {
      this.saveUser(user);
      return Promise.resolve(user);
    })
    .catch(error => Promise.reject(error))
  }

  getProfile(id: string): Promise<any>{
    return new Promise((resolve, reject)=>{
      this.fireDatabase.object('/userProfiles/'+ id)
      .subscribe(data =>{
        data.uid = id;
        let pages: any = {
          'admin': 'HomeAdminPage',
          'distributor': 'HomeDistributorPage',
          'presale': 'HomePresalePage',
        };
        data.page = pages[data.role];
        resolve(data);
      },error=>{
        reject(error)
      })
    })
  }

  getVendedores(){
    let vendedores = [];
    let sizeVendedores = 0;
    return new Promise((resolve, reject)=>{
      this.fireDatabase.list('/supervidores/idSupervidor/VendedoresList')
      .subscribe(list =>{
        sizeVendedores = list.length;
        list.forEach(vendedor=>{
          let imei = vendedor.imei;
          this.fireDatabase.object('/vendedores/'+imei)
          .subscribe(dataVendedor=>{
            vendedores.push(dataVendedor);
            if(vendedores.length == sizeVendedores){
              resolve(vendedores);
            }
          })
        })
      })
    });
  }

  getUser(): any{
    let user = localStorage.getItem('current-user');
    if(user !== null && user !== undefined){
      return JSON.parse(user);
    }
    return null;
  }

  saveUser(newUser: any): void{
    localStorage.setItem('current-user', JSON.stringify(newUser));
    this.userState.next(newUser);
  }

  isLoggedIn(): boolean {
    return (this.getUser() !== null);
  }

  logout(){
    this.fireAuth.auth.signOut();
    localStorage.clear();
  }

  getUserState(){
    return this.userState.asObservable();
  }
  

}
