import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    private authService: AuthService,
    private loadingControler: LoadingController,
    private alertConttoller: AlertController
  ) {}

  onSignin(form: NgForm) {
    const loading = this.loadingControler.create({
      content: 'Signing you in...'
    });
    loading.present();

    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertConttoller.create({
          title: 'Signin failed',
          message: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
