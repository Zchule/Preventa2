import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { AuthService } from './../providers/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navMaster: Nav;
  rootPage:any = 'SplashPage';
  user: any =  {};

  pagesAdmin:any [] = [
    {
      title: 'Inicio',
      icon: 'home',
      component: 'HomeAdminPage'
    },
    {
      title: 'Usuarios',
      icon: 'contacts',
      component: 'ListUsersPage'
    },
    {
      title: 'Productos',
      icon: 'list',
      component: 'ListProductsPage'
    },
  ]
   
  pagesPresale: any[] = [
    {
      title: 'Inicio',
      icon: 'home',
      component: 'HomePresalePage'
    },
    {
      title: 'Inventario',
      icon: 'list',
      component: 'InventoryPage'
    },
    {
      title: 'Ver pedidos',
      icon: 'clipboard',
      component: 'OrdersPresalePage'
    }
  ];

  pagesDistributor: any[] = [
    {
      title: 'Inicio',
      icon: 'home',
      component: 'HomeDistributorPage'
    },
    {
      title: 'Pedidos Entregados',
      component: 'ListsOrdersDistributorPage',
      icon: 'clipboard',
      data: {
        state: 'done'
      }
    },
    {
      title: 'Pedidos Pendientes',
      component: 'ListsOrdersDistributorPage',
      icon: 'clipboard',
      data: {
        state: 'pending'
      }
    },
    {
      title: 'Pedidos a Crédito',
      component: 'ListsOrdersDistributorPage',
      icon: 'clipboard',
      data: {
        type: 'credit'
      }
    },
    {
      title: 'Pedidos al Contado',
      component: 'ListsOrdersDistributorPage',
      icon: 'clipboard',
      data: {
        type: 'payment'
      }
    },
    {
      title: 'Ver todos los pedidos',
      component: 'ListsOrdersDistributorPage',
      icon: 'clipboard',
      data: {
        type: 'all',
        state: 'all'
      }
    },
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private auth: AuthService,
    private menuCtrl: MenuController,
    private oneSignal: OneSignal
  ) {
    this.platform.ready()
    .then(() => {
      this.statusBar.styleDefault();
      this.checkSession();
      this.listenChangeUser();
      this.disenabledMenu();
      if(this.platform.is('cordova')){
        this.listerNotifications();
      }
    });
  }

  openPage( page ){
    if(page.data !== null){
      this.navMaster.setRoot( page.component, page.data);
    }else{
      this.navMaster.setRoot( page.component );
    }
  }

  logout() {
    this.auth.logout();
    this.navMaster.setRoot('LoginPage');
  }

  private checkSession(){
    if(this.auth.isLoggedIn()){
      this.user = this.auth.getUser();
      this.oneSignal.sendTag('role', this.user.role);
      this.navMaster.setRoot(this.user.page);
    }else{
      this.navMaster.setRoot('LoginPage');
    }
    this.splashScreen.hide();
  }

  private disenabledMenu(){
    this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(false, 'menuDistributor')
    this.menuCtrl.enable(false, 'menuPresale')
  }

  private listenChangeUser(){
    this.auth.getUserState()
    .filter(user => user !== null)
    .subscribe(user =>{
      this.user = user;
    });
  }

  private listerNotifications(){
    this.oneSignal.startInit('db22e52a-a6ac-4e79-8f71-16905859dc63', '4446233718');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationOpened()
    .subscribe((data) => {
      if(this.auth.isLoggedIn()){
        let user = this.auth.getUser();
        if(user.role == 'presale'){
          this.navMaster.setRoot('InventoryPage');
        }
      }
    });
    this.oneSignal.endInit();
  }
}