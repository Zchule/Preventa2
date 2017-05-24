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

  pagesUser:any [] = [
    {
      title: 'Home',
      icon: 'home',
      component: 'AdminHomePage'
    },
    {
      title: 'Categorias',
      icon: 'home',
      component: 'AdminCategoriesPage'
    },
    {
      title: 'Marcas',
      icon: 'home',
      component: 'AdminMarksPage'
    },
    {
      title: 'Grupos',
      icon: 'home',
      component: 'AdminHomePage'
    }
    ]
   
  pagesPreventa: any[] = [
    {
      title: 'Clientes',
      component: 'AdminClientsPage',
      icon: 'people',
      index: 0
    },
    {
      title: 'Realizar Pedido',
      icon: 'clipboard',
      component: 'PedidoPage',
      index: 1
    },
    {
      title: 'Mapa',
      icon: 'md-globe',
      component: 'MapPreventaPage',
      index: 2
    }
  ];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private auth: AuthService,
    private fireAuth: AngularFireAuth
  ) {
    this.platform.ready().then(() => {
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

  private listerSession(){
    this.fireAuth.authState.subscribe( user =>{
      if(user !== null){
        this.auth.getProfile(user.uid)
        .then(data =>{
          let profile = data.val();
          let pages: any = {
            'admin': 'HomeAdminPage',
            'distributor': 'HomeDistributorPage',
            'preventa': 'HomePresalePage',
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