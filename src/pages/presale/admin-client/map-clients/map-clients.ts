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
   clients: any[] = [];
   directionsService: any = null;
   directionsDisplay: any = null;
   bounds: any = null;
   myLatLng: any = {};
   markers: any[] = [];
   infowindow;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private clientService: ClientService,
  ) {
    this.bounds = new google.maps.LatLngBounds();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    this.infowindow = new google.maps.InfoWindow();
  }

  ionViewDidLoad() {
    this.load = this.loadCtrl.create({
      content: 'Generando ruta'
    });
    this.load.present();
    this.getPosition();
  }

  goToListsClientsPage(){
    this.navCtrl.push('ListsClientsPage');
  }

  clickClient(client){
    console.log(client);
    google.maps.event.trigger(this.markers[client.marker], 'click');
    //this.map.panTo(this.markers[client.marker].position);
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
    //let panelEle: HTMLElement = document.getElementById('panel');

    // create map
    this.map = new google.maps.Map(mapEle, {
      //center: this.myLatLng,
      center: {
        lat: -17.3940469,
        lng: -66.2339162,
      },
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.clientService.getAll()
      .subscribe((clients:any[]) =>{
        this.load.dismiss();
        this.clients = clients.splice(0,8).map(item =>{
          item.fullName = `${item.name} ${item.apPat} ${item.apMat}`;
          return item;
        });
        this.calculateRoute();
      });
    });
  }

  private createMarker(client){

    let options = {
      position: {
        lat:parseFloat(client.latitude),
        lng:parseFloat(client.longitude)
      },
      map: this.map,
      icon: 'assets/imgs/markers/pin-pink.png'
    }
    let marker = new google.maps.Marker(options);
    
    marker.addListener('click', ()=>{
      
      let contentString = `
        <div class="item-map">
          <div class="item-map-avatar">
            <img src="${client.photo}">
          </div>
          <h2>${client.fullName}</h2>
          <p>${client.direction}</p>
        </div>
      `;
      this.infowindow.setContent(contentString); 
      this.infowindow.open(this.map, marker);
    });
    return marker;
  }

  private calculateRoute(){

    let waypoints = this.getWayPoints();
    this.fitBounds(waypoints);

    this.directionsService.route({
      //origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      origin: new google.maps.LatLng(-17.3940469,-66.2339162),
      destination: new google.maps.LatLng(-17.3940469,-66.2339162),
      //destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status)=> {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
        this.clients.forEach((item) =>{
          let marker = this.createMarker(item);
          this.markers.push(marker);
          item.marker = this.markers.length - 1;
        });
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });   
  }

  private fitBounds(points: any[]){

    points.forEach((point) => {
      var myLatlng = new google.maps.LatLng(point.location.lat, point.location.lng);
      this.bounds.extend(myLatlng);
    });

    this.map.fitBounds(this.bounds);
  }

  private getWayPoints(){
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
