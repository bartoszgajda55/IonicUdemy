import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  onSignup(form: NgForm): void {
    const loadingDialog = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loadingDialog.present();

    this.authService.signup(form.value.email, form.value.password)
      .then(value => {
        loadingDialog.dismiss();
      })
      .catch(reason =>  {
        loadingDialog.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed',
          message: reason.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
