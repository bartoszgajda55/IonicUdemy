import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from "../../models/location";
import {Geolocation} from "@ionic-native/geolocation";
import {Camera, CameraOptions} from "@ionic-native/camera";

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

  constructor(private modalCtrl: ModalController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera) {
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
    const loader = this.loadingCtrl.create({
      content: "Getting your Location..."
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(value => {
        loader.dismiss();
        this.location.lat = value.coords.latitude;
        this.location.lng = value.coords.longitude;
        this.locationIsSet = true;
      })
      .catch(reason => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: "Could not get location",
          duration: 2000
        });
        toast.present();
      });
  }

  onTakePhoto(): void {
    const options: CameraOptions = {
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    };

    this.camera.getPicture(options)
      .then(value => {
        console.log(value);
      })
      .catch(reason => {
        console.log(reason);
      });
  }
}
