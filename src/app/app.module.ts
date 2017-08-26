import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { OneSignal } from '@ionic-native/onesignal';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ProductService } from '../providers/product.service';
import { UserProfileService } from '../providers/user-profile.service';
import { DetersService } from '../providers/deter-service';
import { ClientService } from '../providers/client.service';
import { AuthService } from '../providers/auth.service';
import { TypeProductsService } from '../providers/type-products.service';
import { MarkProductsService } from '../providers/mark-products.service';
import { CategoryProductsService } from '../providers/category-products.service';

import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { OrderService } from '../providers/order.service';
import { PushService } from '../providers/push.service';

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
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    InAppBrowser,
    OneSignal,
    ProductService,
    UserProfileService,
    DetersService,
    ClientService,
    AuthService,
    TypeProductsService,
    MarkProductsService,
    CategoryProductsService,
    Geolocation,
    LaunchNavigator,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OrderService,
    PushService
  ]
})
export class AppModule {}