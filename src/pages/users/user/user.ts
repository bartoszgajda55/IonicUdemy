import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'src/pages/users/user/user.html',
})
export class UserPage implements OnInit{
  name: string;

  constructor(private navParams: NavParams) {}

  ngOnInit() {
    this.name = this.navParams.get('userName');
  }

}
