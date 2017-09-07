import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes";

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {
  quotes: Quote[];

  constructor(
    private quotesService: QuotesService
  ) {}

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavouriteQuotes();
  }

}
