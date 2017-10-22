import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";

export class RecipesService {
  private recipes: Recipe[] = [];

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
}
