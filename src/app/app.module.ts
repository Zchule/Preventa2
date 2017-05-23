import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ProductService } from '../providers/product-service';
import { UserService } from '../providers/user-service';
import { DetersService } from '../providers/deter-service';
import { ClientService } from '../providers/client-service';
import { AuthService } from '../providers/auth-service';

import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { MyApp } from './app.component';

const configFirebase ={
  apiKey: "AIzaSyB7BLUYFFxZw5lJEUt_3RfPMjcJMVcUmuw",
  authDomain: "bddproyecto.firebaseapp.com",
  databaseURL: "https://bddproyecto.firebaseio.com",
  projectId: "bddproyecto",
  storageBucket: "bddproyecto.appspot.com",
  messagingSenderId: "4446233718"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp( configFirebase ),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
