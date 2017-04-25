import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navMaster: Nav;
  rootPage:any = 'LoginPage';

   pages: any[] = [
    {
      title: 'Home',
      icon: 'home',
      component: 'AdminHomePage'
    },
    {
      title: 'Cuidado del Cabello',
      component: 'CuidadosPage',
      index: 0
    },
    {
      title: 'Detergentes',
      component: 'DetergentesPage',
      index: 1
    },
    {
      title: 'Desodorantes',
      component: 'DesodorantesPage',
      index: 2
    },
    {
      title: 'Jabones',
      component: 'JabonesPage',
      index: 3
    }
  ];

  pagesA: any[] = [
    {
      title: 'Home',
      icon: 'home',
      component: 'AdminHomePage'
    },
    {
      title: 'Alimentos de Soya',
      component: 'SoyaPage',
      index: 0
    }
  ];
  pagesP: any[] = [
    {
      title: 'Home',
      icon: 'home',
      component: 'AdminHomePage'
    },
    {
      title: 'Clientes',
      component: 'AdminClientsPage',
      index: 0
    },
    {
      title: 'Mapa de Preventa',
      component: 'MapPreventaPage',
      index: 1
    }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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
}

