import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { ClientService } from '../../../../providers/client.service';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map-clients',
  templateUrl: 'map-clients.html',
})
export class MapClientsPage {

   map: any;
   load: Loading;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private clientService: ClientService,
  ) {}

  ionViewDidLoad() {
    this.load = this.loadCtrl.create();
    this.load.present();
    this.getPosition();
  }

  goToListsClientsPage(){
    this.navCtrl.push('ListsClientsPage');
  }

  private getClients(){
    this.clientService.getAll()
    .subscribe((clients:any[]) =>{
      clients.forEach(item =>{
        this.createMarker({
          position: {lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)},
          map: this.map,
          title: 'Hello World!',
          icon: 'assets/imgs/markers/pin-green.png'
        });
      });
    })
  }

  private getPosition():any{
    this.geolocation.getCurrentPosition({
      maximumAge: 20000
    })
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      this.load.dismiss();
      console.log(error);
    })
  }

  private loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.createMarker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!',
        icon: 'assets/imgs/markers/here.png'
      });
      mapEle.classList.add('show-map');
      this.load.dismiss();
      this.getClients();
    });
  }

  private createMarker(marker){
    return new google.maps.Marker(marker);
  }

}
