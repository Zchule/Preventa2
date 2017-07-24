import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navMaster: Nav;
  rootPage:any = 'LoginPage';
  profile: any =  {};

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
    private fireAuth: AngularFireAuth,
    private storage: Storage
  ) {
    this.platform.ready()
    .then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listerSession();
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
    this.fireAuth.auth.signOut();
    this.storage.remove('session');
    this.navMaster.setRoot('LoginPage');
  }

  private listerSession(){
    this.storage.get('session')
    .then(data =>{
      let profile = JSON.parse(data);
      if(profile !== null){
        let pages: any = {
          'admin': 'HomeAdminPage',
          'distributor': 'HomeDistributorPage',
          'presale': 'HomePresalePage',
        };
        this.profile = profile;
        this.navMaster.setRoot(pages[this.profile.role]);
      }
    })
    
  }
}