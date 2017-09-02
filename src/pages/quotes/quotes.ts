import { Component, OnInit } from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {Quote} from "../../data/quote.interface";

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{
  quoteGroup: { category: string, quotes: Quote[], icon: string };

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavourite(slectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure ?',
      message: 'Are you sure you want to add the quote ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Ok');
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Nope');
          }
        }
      ]
    });

    alert.present();
  }

}
