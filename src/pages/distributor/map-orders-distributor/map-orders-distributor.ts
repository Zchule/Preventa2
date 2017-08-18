import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

import { OrderService } from '../../../providers/order.service'; 

declare var google;

@IonicPage()
@Component({
  selector: 'page-map-orders-distributor',
  templateUrl: 'map-orders-distributor.html',
})
export class MapOrdersDistributorPage {

  map: any;
  load: Loading;
  orders: any[] = [];
  directionsService: any = null;
  directionsDisplay: any = null;
  myLatLng: any = {};
  state: string = 'all';
  type: string = 'all';
  total: number = 0;
  bounds: any = null;
  infowindow: any;
  legs: any[] =[];
  itemSelected: any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private geolocation: Geolocation,
    private storage: Storage,
    private modalCtrl: ModalController,
    private launchNavigator: LaunchNavigator
  ) {
    this.state = this.navParams.get('state') || 'all';
    this.type = this.navParams.get('type') || 'all';
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    this.bounds = new google.maps.LatLngBounds();
    this.infowindow = new google.maps.InfoWindow();
  }

  ionViewDidLoad() {

    this.load = this.loadCtrl.create({
      content: 'Buscando ruta'
    });
    this.load.present();

    this.storage.get('session')
    .then(data =>{
      let profile = JSON.parse(data);
      return this.orderService.getProductsByZone(profile.zone || '');
    })
    .then((orders:any[]) =>{
      this.orders = this.getOrders(orders)
      .splice(0,10)
      .map(order =>{
        order.client.fullName = `${order.client.name} ${order.client.apPat} ${order.client.apMat}`;
        return order;
      });
      console.log(this.orders);
      this.getPosition();
    })
    .catch(error =>{
      this.load.dismiss();
    });
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
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute(){

    let waypoints = this.getWaypoints();
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
          let order = this.matchClient(item.end_location.lat(),item.end_location.lng());
          if(order){
            this.legs.push({
              leg: item,
              order: order,
              color: 'secondary'
            });
          }
        });
        this.legs.unshift({
          leg:{
            end_address: 'Punto de inicio'
          },
          color: 'danger',
          order: null
        });
        this.legs.push({
          leg:{
            end_address: 'Punto de final'
          },
          order: null,
          color: 'danger'
        });
        this.renderMarkers();
        this.computeTotalDistance(response);
      } else {
        alert('Could not display directions due to: ' + status);
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

  private getWaypoints(){
    return this.orders.map(item =>{
      return {
        location: {
          lat:parseFloat(item.client.latitude),
          lng:parseFloat(item.client.longitude)
        },
        stopover: true,
      }
    });
  }

  private getOrders(orders: any[]){
    if(this.state == 'all' && this.type == 'all'){
      return orders.filter(item =>{
        return item.state.toLocaleLowerCase() !== 'init';
      });
    }else if(this.state == 'all' && this.type != 'all'){
      return orders.filter(item =>{
        return item.type.toLocaleLowerCase() == this.type.toLocaleLowerCase();
      });
    }else if(this.state != 'all' && this.type == 'all'){
      return orders.filter(item =>{
        return item.state.toLocaleLowerCase() == this.state.toLocaleLowerCase();
      });
    }else if(this.state != 'all' && this.type != 'all'){
      return orders.filter(item =>{
        return item.state.toLocaleLowerCase() == this.state.toLocaleLowerCase() && 
               item.type.toLocaleLowerCase() == this.type.toLocaleLowerCase();
      });
    }
  }

  private computeTotalDistance(result) {
    let total = 0;
    let myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    this.total = total / 1000;
  }

  clickLeg(leg){
    if(leg.order){
      this.itemSelected = leg;
    }
    google.maps.event.trigger(leg.marker, 'click');
  }

  showOrder(){
    let order = this.itemSelected.order;
    let modal = this.modalCtrl.create('OrderDistributorPage',{
      order: order.key,
      state: order.state
    });
    modal.present();
  }

  closeLeg(){
    this.itemSelected = null;
  }

  openNavigate(){
    let lat = this.itemSelected.order.client.latitude;
    let lng = this.itemSelected.order.client.longitude;
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
      if(leg.order){
        let contentString = `
        <div class="item-map">
          <h2>${leg.order.client.fullName}</h2>
          <p>${leg.order.client.direction}</p>
        </div>`;
        let icon = `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${index +1}%7C32db64%7C000000`;
        leg.marker = this.createMarker(contentString, leg.order.client.latitude, leg.order.client.longitude, icon);
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

  private matchClient(lat, lng){
    let result = this.orders.filter(item =>{
      let latClient = parseFloat(item.client.latitude).toFixed(4);
      let lngClient = parseFloat(item.client.longitude).toFixed(4);

      let latStep = lat.toFixed(4);
      let lngStep = lng.toFixed(4);
      
      return (latClient == latStep) && (lngClient == lngStep);
    });
    return (result.length > 0) ? result[0] : null;
  }

}
