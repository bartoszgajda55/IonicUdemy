import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
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

  constructor(public navParams: NavParams) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm()
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {

  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required)
    });
  }
}
