import { Component } from '@angular/core';
import {IonicPage, ModalController, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {

  constructor(
    private viewCtrl: ViewController
  ) {}

  onClose() {
    this.viewCtrl.dismiss();
  }

}
