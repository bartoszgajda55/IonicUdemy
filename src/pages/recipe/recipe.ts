import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  private recipe: Recipe;
  private index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  public onAddIngredients(): void {

  }

  public onEditRecipe(): void {

  }

  public onDeleteRecipe(): void {

  }

}
