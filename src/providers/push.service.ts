import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PushService {

  private apiUrl: string = 'https://onesignal.com/api/v1/notifications';

  constructor(
    private http: Http
  ) {}

  sendPushPreventa(message: string){
    let notification = { 
      app_id: "MWFlMmM3N2ItMmM4ZC00MjFmLWFmNmEtOWM2YmZmYzI2Zjgw",
      contents: {"en": message},
      included_segments: ["preventa"]
    };
    return this.http.post(this.apiUrl, notification)
    .map(response => response.json())
    .toPromise();
  }

}
