import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-sl-options',
  templateUrl: 'sl-options.html'
})
export class SlOptionsPage {
  constructor(
    private viewCtrl: ViewController
  ) {}

  onAction(mode: string) {
    this.viewCtrl.dismiss({action: mode});
  }
}
