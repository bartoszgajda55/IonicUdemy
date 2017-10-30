import {Component} from '@angular/core';
import {IonicPage, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {SlOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private shoppingListService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService) {
  }

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
    popover.onDidDismiss(data => {
      if (data.action === 'load') {
        this.authService.getActiveUser().getToken()
          .then(token => {
            this.shoppingListService.fetchList(token)
              .subscribe((list: Ingredient[]) => {
                if (list) {
                  this.listItems = list;
                } else {
                  this.listItems = [];
                }
              }, error2 => {
                console.log(error2);
              });
          });
      } else {
        this.authService.getActiveUser().getToken()
          .then(token => {
            this.shoppingListService.storeList(token)
              .subscribe(() => {
                console.log('Success');
              }, error2 => {
                console.log(error2);
              });
          });
      }
    });
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
  }
}
