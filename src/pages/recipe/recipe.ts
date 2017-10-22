import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
  private recipe: Recipe;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  public onAddIngredients(): void {

  }

  public onEditRecipe(): void {

  }

  public onDeleteRecipe(): void {

  }

}
