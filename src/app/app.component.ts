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

  pagesUser:any [] = [
    {
      title: 'Usuarios',
      icon: 'contacts',
      component: 'ListUsersPage'
    }
    ,
    {
      title: 'Grupos',
      icon: 'folder',
      component: 'AdminHomePage'
    },
    {
      title: 'Categorias',
      icon: 'list-box',
      component: 'AdminCategoriesPage'
    },
    {
      title: 'Marcas',
      icon: 'ios-bookmarks-outline',
      component: 'AdminMarksPage'
    }
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
    },
    {
      title: 'Mapa',
      icon: 'globe',
      component: 'MapPreventaPage'
    }
  ];

  pagesDistributor: any[] = [
    {
      title: 'Inicio',
      icon: 'home',
      component: 'PedidoPage'
    },
    {
      title: 'Ver pedidos',
      icon: 'ios-clipboard',
      component: 'PedidoPage'
    },
    {
      title: 'Pedidos entregados',
      component: 'ListsClientsPage',
      icon: 'clipboard'
    },
    {
      title: 'Pedidos Pendientes',
      component: 'ListsClientsPage',
      icon: 'ios-clipboard-outline'
    },
    {
      title: 'Pedidos a Credito',
      component: 'ListsClientsPage',
      icon: 'md-clipboard'
    },
    {
      title: 'Pedidos al Contado',
      component: 'ListsClientsPage',
      icon: 'md-clipboard'
    },
    {
      title: 'Mapa',
      icon: 'globe',
      component: 'MapPreventaPage'
    }
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
    if(page.index !== null){
      this.navMaster.setRoot( page.component ,{
        index: page.index
      });
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