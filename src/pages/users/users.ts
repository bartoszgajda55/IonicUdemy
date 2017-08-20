import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {UserPage} from "../user/user";

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  constructor(private navCtrl: NavController) {}

  onLoadUser(name: string) {
    this.navCtrl.push(UserPage, {userName: name}, {
      direction: 'forward',
      duration: 1000,
      easing: 'ease-out'
    });
  }

  ionViewCanEnter(): boolean | Promise<boolean> {
    console.log('ionViewCanEnter');
    const rnd = Math.random();
    return rnd > 0.8;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
  }
}
