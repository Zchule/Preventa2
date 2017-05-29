import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../providers/auth.service';

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
      title: 'Ver pedidos',
      icon: 'clipboard',
      component: 'ListsOrdersDistributorPage'
    },
    {
      title: 'Pedidos entregados',
      component: 'ListsOrdersDistributorPage',
      icon: 'clipboard',
      data: {
        state: 'done'
      }
    },
    {
      title: 'Pedidos Pendientes',
      component: 'ListsOrdersDistributorPage',
      icon: 'clipboard-outline',
      data: {
        state: 'pending'
      }
    },
    {
      title: 'Pedidos a Credito',
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
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private auth: AuthService,
    private fireAuth: AngularFireAuth
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
    this.navMaster.setRoot('LoginPage');
  }

  private listerSession(){
    this.fireAuth.authState.subscribe( user =>{
      if(user !== null){
        this.auth.getProfile(user.uid)
        .then(profile =>{
          this.profile = profile;
          let pages: any = {
            'admin': 'HomeAdminPage',
            'distributor': 'HomeDistributorPage',
            'presale': 'HomePresalePage',
          };
          this.navMaster.setRoot(pages[profile.role]);
        })
        .catch(error=>{
          console.error(error);
        })
      }
    }, error=>{
      console.error(error);
    })
  }
}