import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";

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
              private modalCtrl: ModalController) {
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
}
