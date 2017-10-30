import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "./auth";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(
    private http: Http,
    private authService: AuthService
  ) {}

  public addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]): void {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients))
  }

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]): void {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  public removeRecipe(index: number): void {
    this.recipes.splice(index, 1);
  }

  storeList(token: string): Observable<any> {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-recipebook-7369b.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes)
      .map((response) => { response.json() });
  }

  fetchList(token: string): Observable<any> {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-recipebook-7369b.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
      .map(response => response.json())
      .do((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes
        } else {
          this.recipes = [];
        }
      });
  }
}
