import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {

  constructor(
    public fireAuth: AngularFireAuth,
    private fireDatabase: AngularFireDatabase
  ){}

  doLogin(email: string, password: string): Promise<any> {
    return <any>this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user => this.getProfile(user.uid) )
    .then(data =>{
      let profile = data.val();
      let pages: any = {
        'admin': 'HomeAdminPage',
        'distributor': 'HomeDistributorPage',
        'preventa': 'HomePresalePage',
      };
      return Promise.resolve(pages[profile.role]);
    })
    .catch(error => Promise.reject(error));
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
