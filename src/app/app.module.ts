import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

import { ProductService } from '../providers/product-service';
import { UserService } from '../providers/user-service';
import { DetersService } from '../providers/deter-service';
import { ClientService } from '../providers/client-service';

import { AuthService } from '../providers/auth-service';

import { HttpModule } from '@angular/http';

import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

export const configFirebase ={
  apiKey: "AIzaSyB7BLUYFFxZw5lJEUt_3RfPMjcJMVcUmuw",
  authDomain: "bddproyecto.firebaseapp.com",
  databaseURL: "https://bddproyecto.firebaseio.com",
  projectId: "bddproyecto",
  storageBucket: "bddproyecto.appspot.com",
  messagingSenderId: "4446233718"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

firebase.initializeApp(configFirebase);

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp( configFirebase, myFirebaseAuthConfig )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ProductService,
    UserService,
    DetersService,
    ClientService,
    AuthService,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
