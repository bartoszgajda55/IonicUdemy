import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth";
import {Observable} from "rxjs/Observable";

import 'rxjs/rx';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(
    private http: Http,
    private authService: AuthService
  ) {}

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string): Observable<any> {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-recipebook-7369b.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
      .map(value => value.json());
  }

  fetchList(token: string): Observable<any> {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-recipebook-7369b.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .map(value => value.json() as any)
      .do((data: Ingredient[]) => {
        if (data) {
          this.ingredients = data
        } else {
          this.ingredients = [];
        }
      });
  }
}
