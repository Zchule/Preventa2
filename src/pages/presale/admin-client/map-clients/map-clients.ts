import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, ModalController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

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
  infowindow: any;
  legs: any[] =[];
  itemSelected: any = null;
  total: number = 0;
  zone: string;

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private loadCtrl: LoadingController,
    private clientService: ClientService,
    private launchNavigator: LaunchNavigator,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.bounds = new google.maps.LatLngBounds();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    this.infowindow = new google.maps.InfoWindow();
    this.zone = this.navParams.get('zone') || 'Norte';
  }

  ionViewDidLoad() {
    this.load = this.loadCtrl.create({
      content: 'Generando ruta'
    });
    this.load.present();
    this.clientService.getClientsByZone(this.zone)
    .then((clients:any[]) =>{
      this.clients = clients
      .splice(0,10)
      .map(client =>{
        client.fullName = `${client.name} ${client.apPat} ${client.apMat}`;
        return client;
      });
      console.log(this.clients);
      this.getPosition();
    })
    .catch(error =>{
      this.load.dismiss();
    });
  }

  goToListsClientsPage(){
    this.navCtrl.push('ListsClientsPage', {
      zone: this.zone
    });
  }

  private getPosition():any{
    this.geolocation.getCurrentPosition({
      maximumAge: 50000,
      timeout: 5000,
    })
    .then(position => {
      this.myLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.loadMap();
    })
    .catch(error =>{
      let alert = this.alertCtrl.create({
        title: 'Ocurrió un problema',
        message: 'Por favor habilita tu geolocalización en tu dispositivo',
        buttons: ['Aceptar']
      });
      alert.present();
      this.load.dismiss();
    })
  }

  private loadMap(){
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute(){

    let waypoints = this.getWayPoints();
    this.fitBounds(waypoints);

    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status)=> {
      this.load.dismiss();
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        console.log(response);
        response.routes[0].legs.forEach((item, index)=>{
          let client = this.matchClient(item.end_location.lat(),item.end_location.lng());
          if(client){
            this.legs.push({
              leg: item,
              client: client,
              color: 'secondary'
            });
          }
        });
        this.legs.unshift({
          leg:{
            end_address: 'Punto de inicio'
          },
          color: 'danger',
          client: null
        });
        this.legs.push({
          leg:{
            end_address: 'Punto de final'
          },
          client: null,
          color: 'danger'
        });
        this.renderMarkers();
        this.computeTotalDistance(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });   
  }

  clickLeg(leg){
    if(leg.client){
      this.itemSelected = leg;
    }
    google.maps.event.trigger(leg.marker, 'click');
  }

  showClient(){
    let modal = this.modalCtrl.create('ViewClientPage',{
      client: this.itemSelected.client,
    });
    modal.present();
  }

  closeLeg(){
    this.itemSelected = null;
  }

  openNavigate(){
    let lat = this.itemSelected.client.latitude;
    let lng = this.itemSelected.client.longitude;
    let options: LaunchNavigatorOptions = {
      start: [this.myLatLng.lat, this.myLatLng.lng],
      transportMode: 'driving'
    };
    
    this.launchNavigator.navigate([lat, lng], options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  private renderMarkers(){
    this.legs
    .forEach((leg, index)=>{
      if(leg.client){
        let contentString = `
        <div class="item-map">
          <h2>${leg.client.fullName}</h2>
          <p>${leg.client.direction}</p>
        </div>`;
        let icon = `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${index +1}%7C32db64%7C000000`;
        leg.marker = this.createMarker(contentString, leg.client.latitude, leg.client.longitude, icon);
      }else{
        let contentString = `
        <div class="item-map">
          <h5>${leg.leg.end_address}</h5>
        </div>`;
        let icon = `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${index +1}%7Cf53d3d%7C000000`;
        leg.marker = this.createMarker(contentString, this.myLatLng.lat, this.myLatLng.lng, icon);
      }
    });
  }

  private fitBounds(points: any[]){

    this.bounds.extend(this.myLatLng);

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

  private matchClient(lat, lng){
    let result = this.clients.filter(item =>{
      let latClient = parseFloat(item.latitude).toFixed(3);
      let lngClient = parseFloat(item.longitude).toFixed(3);

      let latStep = lat.toFixed(3);
      let lngStep = lng.toFixed(3);
      
      return (latClient == latStep) && (lngClient == lngStep);
    });
    return (result.length > 0) ? result[0] : null;
  }

  private createMarker(html: string, lat: number, lng: number, icon: string){
    
    let options = {
      position: {
        lat: lat,
        lng: lng
      },
      map: this.map,
      icon: icon,
      zIndex: Math.round(lat*-100000)<<5
    }
    let marker = new google.maps.Marker(options);
    
    marker.addListener('click', ()=>{
      this.infowindow.setContent(html); 
      this.infowindow.open(this.map, marker);
    });
    return marker;
  }

  private computeTotalDistance(result) {
    let total = 0;
    let myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    this.total = total / 1000;
  }

  

}
