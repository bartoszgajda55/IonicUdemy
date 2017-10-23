import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(
    private authService: AuthService
  ) {}

  onSignup(form: NgForm): void {
    this.authService.signup(form.value.email, form.value.password)
      .then(value => {
        console.log(value);
      })
      .catch(reason =>  {
        console.log(reason);
      });
  }
}
