import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home-distributor',
  templateUrl: 'home-distributor.html',
})
export class HomeDistributorPage {

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
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private menuCtrl: MenuController,
    private alertCtrl: AlertController
  ) {}

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'menuAdmin');
    this.menuCtrl.enable(true, 'menuDistributor')
    this.menuCtrl.enable(false, 'menuPresale')
  }

  goToListsOrdersDistributorPage(state, type){
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
              this.navCtrl.push('ListsOrdersDistributorPage',{
                state: state,
                type: type,
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
