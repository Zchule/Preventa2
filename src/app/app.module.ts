import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';

import { ProductService } from '../providers/product-service';
import { UserService } from '../providers/user-service';
import { DetersService } from '../providers/deter-service';
import { ClientService } from '../providers/client-service';

import { HttpModule } from '@angular/http';


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
    AngularFireModule.initializeApp( configFirebase )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProductService,
    UserService,
    DetersService,
    ClientService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
