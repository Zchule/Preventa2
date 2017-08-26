import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
      title: 'Ver Clientes',
      component: 'ListsClientsPage',
      icon: 'people'
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
    private menuCtrl: MenuController
  ) {
    this.platform.ready()
    .then(() => {
      this.statusBar.styleDefault();
      this.checkSession();
      this.listenChangeUser();
      this.disenabledMenu();
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
      console.log(this.user);
      let pages: any = {
        'admin': 'HomeAdminPage',
        'distributor': 'HomeDistributorPage',
        'presale': 'HomePresalePage',
      };
      this.navMaster.setRoot(pages[this.user.role]);
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
}