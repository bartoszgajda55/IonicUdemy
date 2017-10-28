import { Component } from '@angular/core';
import {IonicPage, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {SlOptionsPage} from "./sl-options/sl-options";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(
    private shoppingListService: ShoppingListService,
    private popoverCtrl: PopoverController
  ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent): void {
    const popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ev: event});
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
  }
}
