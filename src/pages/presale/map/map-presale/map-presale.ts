import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map-presale',
  templateUrl: 'map-presale.html',
})
export class MapPresalePage {

   map: any;
   load: Loading;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.load = this.loadCtrl.create();
    this.load.present();
    this.getPosition();
  }

  private getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
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
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!',
        icon: 'assets/imgs/markers/here.png'
      });
      mapEle.classList.add('show-map');
      this.load.dismiss();
    });
  }

}
