import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private geolocation: Geolocation,
  ) {
    this.state = this.navParams.get('state') || 'all';
    this.type = this.navParams.get('type') || 'all';
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
  }

  ionViewDidLoad() {
    this.load = this.loadCtrl.create({
      content: 'Buscando ruta'
    });
    this.load.present();
    this.getPosition();
    this.orderService.getOrders()
    .subscribe((orders:any[]) =>{
      this.orders = this.getOrders(orders);
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
      mapEle.classList.add('show-map');
      console.log('map');
      this.calculateRoute();
    });
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
      console.log('route');
      this.load.dismiss();
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });   
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
      return orders;
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

}
