import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../models/location";

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location: Location;
  marker: Location;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
    this.location = this.navParams.get('data');
  }

  onSetMarker(event: any): void {
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm(): void {
    this.viewCtrl.dismiss({
      location: this.marker
    });
  }

  onAbort(): void {
    this.viewCtrl.dismiss();
  }
}
