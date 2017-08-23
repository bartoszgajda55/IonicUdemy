import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  name: string;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.name = this.navParams.get('userName');
  }

  onGoBack() {
    this.navCtrl.pop();
  }
}
