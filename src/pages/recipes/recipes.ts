import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  private recipes: Recipe[];

  constructor(
    private navCtrl: NavController,
    private recipesService: RecipesService
    ) {}

  ionViewWillEnter() {
    this.recipes = this.recipesService.getRecipes();
  }

  public onNewRecipe(): void {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  public onLoadRecipe(recipe: Recipe, index: number): void {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }
}
