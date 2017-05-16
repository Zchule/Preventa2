import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as _ from "lodash";


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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      let posiciones =[
        {
          title:'1',
          place: 'cama',
          person: "2"
        },
        {
          title:'2',
          place: 'cama',
          person: "3"
        },
        {
          title:'2',
          place: 'cama',
          person: "2"
        },
        {
          title:'1',
          place: 'parque',
          person: "2"
        }
      ]
      let result: any = _.groupBy(posiciones, 'place');
      result.cama = _.groupBy(result.cama, 'person');
      result.parque = _.groupBy(result.parque, 'person');
      console.log(result);
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

  goToHomePage(){
    this.navMaster.setRoot('AdminHomePage');
    //this.navMaster.pop();
  }
}

