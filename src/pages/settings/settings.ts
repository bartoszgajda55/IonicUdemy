import { Component } from '@angular/core';
import {IonicPage, Toggle} from 'ionic-angular';
import {SettingsService} from "../../services/settings";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  constructor(
    private settingsService: SettingsService
  ) {}

  onToggle(toggle: Toggle): void {
    this.settingsService.setBackground(toggle.checked);
  }

  checkAltBackground(): boolean {
    return this.settingsService.isAltBackground();
  }
}
