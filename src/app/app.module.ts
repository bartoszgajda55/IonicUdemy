import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FavouritesPage} from "../pages/favourites/favourites";
import {LibraryPage} from "../pages/library/library";
import {QuotePage} from "../pages/quote/quote";
import {QuotesPage} from "../pages/quotes/quotes";
import {SettingsPage} from "../pages/settings/settings";
import {TabsPage} from "../pages/tabs/tabs";
import {QuotesService} from "../services/quotes";
import {SettingsService} from "../services/settings";

@NgModule({
  declarations: [
    MyApp,
    FavouritesPage,
    LibraryPage,
    QuotePage,
    QuotesPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavouritesPage,
    LibraryPage,
    QuotePage,
    QuotesPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuotesService,
    SettingsService
  ]
})
export class AppModule {}
