import {Component, OnInit} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode: string = 'New';
  selectOptions: String[] = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;

  constructor(
    public navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService,
    private navController: NavController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm()
  }

  onSubmit() {
    const recipeFormValues = this.recipeForm.value;
    let ingredients = [];
    if (recipeFormValues.ingredients.length > 0) {
      ingredients = recipeFormValues.ingredients.map(name => {
        return {name: name, amount: 1}
      });
    }
    this.recipesService.addRecipe(recipeFormValues.title, recipeFormValues.description, recipeFormValues.difficulty, ingredients);
    this.navController.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What to do ?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            setTimeout(() => {
              this.createNewIngredientAlert().present();
            }, 100);
          }
        },
        {
          text: 'Remove All',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              this.showToaster("Items deleted");
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              this.showToaster("Please enter valid data");
              return null;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            this.showToaster("Item Added");
          }
        }
      ]
    });
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }

  private showToaster(message: string): void {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
}
}
