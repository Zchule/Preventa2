import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home-presale',
  templateUrl: 'home-presale.html',
})
export class HomePresalePage {

  private inputs = [
    {
      type: 'radio',
      name: 'sur',
      value: 'Sur',
      label: 'Sur',
    },
    {
      type: 'radio',
      name: 'este',
      value: 'Este',
      label: 'Este'
    },
    {
      type: 'radio',
      name: 'norte',
      value: 'Norte',
      label: 'Norte'
    },
    {
      type: 'radio',
      name: 'oeste',
      value: 'Oste',
      label: 'Oste'
    }
  ]

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(false, 'menuDistributor')
    this.menuCtrl.enable(true, 'menuPresale')
  }

  goToCreateOrderPresalePage(){
    let alert = this.alertCtrl.create({
      title: 'Zonas:',
      inputs: this.inputs,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: (data) =>{
            if(data){
              this.navCtrl.push('CreateOrderPresalePage',{
                zone: data
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  goToMapClientsPage(){
    let alert = this.alertCtrl.create({
      title: 'Zonas:',
      inputs: this.inputs,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: (data) =>{
            if(data){
              this.navCtrl.push('MapClientsPage',{
                zone: data
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  goToClientPage(){
    let alert = this.alertCtrl.create({
      title: 'Zonas:',
      inputs: this.inputs,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: (data) =>{
            if(data){
              this.navCtrl.push('ListsClientsPage',{
                zone: data
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

}
