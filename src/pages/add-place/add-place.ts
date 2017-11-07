import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Geolocation} from "@ionic-native/geolocation";

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private geolocation: Geolocation) {
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {
      data: this.location,
      isSet: this.locationIsSet
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }
    });
  }

  onLocate(): void {
    this.geolocation.getCurrentPosition()
      .then(value => {
        console.log(value);
        this.location.lat = value.coords.latitude;
        this.location.lng = value.coords.longitude;
        this.locationIsSet = true;
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}
