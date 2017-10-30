import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {DatabaseOptionsPage} from "../database-options/database-options";
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
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
  ) { }

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
            this.shoppingListService.fetchList(token)
              .subscribe((list: Ingredient[]) => {
                loading.dismiss();
                if (list) {
                  this.listItems = list;
                } else {
                  this.listItems = [];
                }
              }, error2 => {
                this.handleError(error2.json().error);
              });
          });
      } else if (data.action === 'store') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then(token => {
            this.shoppingListService.storeList(token)
              .subscribe(() => {
                loading.dismiss();
              }, error2 => {
                this.handleError(error2.json().error);
              });
          });
      }
    });
  }

  private loadItems() {
    this.listItems = this.shoppingListService.getItems();
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
