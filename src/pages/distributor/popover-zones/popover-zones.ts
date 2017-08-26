import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popover-zones',
  templateUrl: 'popover-zones.html',
})
export class PopoverZonesPage {

  constructor(public viewCtrl: ViewController) {}
  
  close(zone) {
    this.viewCtrl.dismiss(zone);
  }

}
