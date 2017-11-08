import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places.service";

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: Place;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private placesService: PlacesService) {
    this.place = this.navParams.get("place");
  }

  onCloseModal(): void {
    this.viewCtrl.dismiss();
  }

  onDelete(): void {
    this.placesService.deletePlace(this.place);
    this.viewCtrl.dismiss();
  }

}
