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
      title: 'Cuidado Personal',
      icon: 'list',
      component: 'CuidadosPage',
      index: 0
    },
    {
      title: 'Detergentes',
      icon: 'list',
      component: 'DetergentesPage',
      index: 1
    },
    {
      title: 'Desodorantes',
      icon: 'camera',
      component: 'DesodorantesPage'
    },
    {
      title: 'Jabones',
      icon: 'beer',
      component: 'JabonesPage'
    }
  ];

  pages2: any[] = [
    {
      title: 'Home',
      icon: 'home',
      component: 'AdminHomePage'
    },
    {
      title: 'Alimentos de Soya',
      icon: 'list',
      component: 'SoyaPage',
      index: 0
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

