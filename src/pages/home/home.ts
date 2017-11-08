import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places.service";
import {PlacePage} from "../place/place";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(private placesService: PlacesService,
              private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.places = this.placesService.getPlaces();
  }

  onOpenPlace(place: Place): void {
    const modal = this.modalCtrl.create(PlacePage, {place: place});
    modal.present();
  }

}
