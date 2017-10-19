import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
    private alertController: AlertController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm()
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What to do ?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {}
        },
        {
          text: 'Remove All',
          role: 'destructive',
          handler: () => {}
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }

  private createNewIngredientAlert() {
    const newIngredientAlert = this.alertController.create({
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

            }
          }
        }
      ]
    });
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required)
    });
  }
}
