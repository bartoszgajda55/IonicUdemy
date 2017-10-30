import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import firebase from 'firebase';
import {AuthService} from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  tabsPage:any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
     firebase.initializeApp({
       apiKey: "AIzaSyBfcfrtBVQz22Qp7lxHZEF8YzxqT6h9eYU",
       authDomain: "ionic-recipebook-7369b.firebaseapp.com",
       databaseURL: "https://ionic-recipebook-7369b.firebaseio.com",
       projectId: "ionic-recipebook-7369b",
       storageBucket: "ionic-recipebook-7369b.appspot.com",
       messagingSenderId: "291799003450"
     });

     firebase.auth().onAuthStateChanged(user => {
       if (user) {
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
       } else {
         this.isAuthenticated = false;
         this.nav.setRoot(this.signinPage);
       }
     });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any): void {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(): void {
    this.authService.logout();
    this.menuCtrl.close();
  }
}

