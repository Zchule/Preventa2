import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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
   bounds: any = null;
   clients: any[] = [];
   directionsService: any = null;
   directionsDisplay: any = null;
   myLatLng: any = {};

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private clientService: ClientService,
  ) {
    //this.bounds = new google.maps.LatLngBounds();
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
  }

  ionViewDidLoad() {
    this.load = this.loadCtrl.create();
    this.load.present();
    this.getPosition();
    this.clientService.getAll()
    .subscribe((clients:any[]) =>{
      this.clients = clients;
    });
  }

  goToListsClientsPage(){
    this.navCtrl.push('ListsClientsPage');
  }

  private getPosition():any{
    this.geolocation.getCurrentPosition({
      maximumAge: 20000
    })
    .then(position => {
      this.myLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.loadMap();
    })
    .catch(error =>{
      this.load.dismiss();
      console.log(error);
    })
  }

  private loadMap(){
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
    let panelEle: HTMLElement = document.getElementById('panel');

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 8
    });
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(panelEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.load.dismiss();
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private createMarker(markerOptions, title = null){
    let marker = new google.maps.Marker(markerOptions);
    
    if(title !== null){
      marker.addListener('click', ()=>{
        let popup = new google.maps.InfoWindow({content: title});
        popup.open(this.map, marker);
      });
    }
    return marker;
  }

  private calculateRoute(){
    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      waypoints: this.getWaypoints(),
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status)=> {
      console.log(response);
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });   
  }

  private renderClients(){
    this.clients.forEach(client =>{
      this.createMarker({
        position: {
          lat:parseFloat(client.latitude),
          lng:parseFloat(client.longitude)
        },
        map: this.map,
        icon: 'assets/imgs/markers/pin-pink.png'
      }, client.name);
    });
  }

  private getWaypoints(){
    return this.clients.map(item =>{
      return {
        location: {
          lat:parseFloat(item.latitude),
          lng:parseFloat(item.longitude)
        },
        stopover: true,
      }
    });
  }

}
