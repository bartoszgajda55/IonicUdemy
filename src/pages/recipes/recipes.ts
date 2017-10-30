import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, PopoverController} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {Ingredient} from "../../models/ingredient";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  private recipes: Recipe[];

  constructor(
    private navCtrl: NavController,
    private recipesService: RecipesService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService
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

    onShowOptions(event: MouseEvent): void {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (data.action === 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then(token => {
            this.recipesService.fetchList(token)
              .subscribe((list: Recipe[]) => {
                loading.dismiss();
                if (list) {
                  this.recipes = list;
                } else {
                  this.recipes = [];
                }
              }, error2 => {
                this.handleError(error2.json().error);
              });
          });
      } else if (data.action === 'store') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then(token => {
            this.recipesService.storeList(token)
              .subscribe(() => {
                loading.dismiss();
              }, error2 => {
                this.handleError(error2.json().error);
              });
          });
      }
    });
  }

  private handleError(error: string): void {
    const alert = this.alertCtrl.create({
      title: 'Error occurred!',
      message: error,
      buttons: ['OK']
    });
    alert.present();
  }
}
