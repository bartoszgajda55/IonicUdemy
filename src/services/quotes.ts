import {Quote} from "../data/quote.interface";

export class QuotesService {
  private favouriteQuotes: Quote[] = [];

  addQuoteToFavourites(quote: Quote) {
    this.favouriteQuotes.push(quote);
    console.log(this.favouriteQuotes);
  }

  removeQuoteFromFavourite(quote: Quote) {
    const position = this.favouriteQuotes.findIndex((quoteElement: Quote) => {
      return quoteElement.id == quote.id;
    })
    this.favouriteQuotes.splice(position, 1);
  }

  getFavouriteQuotes(): Quote[] {
    return this.favouriteQuotes.slice();
  }
}
