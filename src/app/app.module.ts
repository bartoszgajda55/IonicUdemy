import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {HomePage} from "../pages/home/home";
import {AddPlacePage} from "../pages/add-place/add-place";
import {PlacePage} from "../pages/place/place";
import {SetLocationPage} from "../pages/set-location/set-location";

import { AgmCoreModule } from '@agm/core';

const PAGES = [
  MyApp,
  HomePage,
  AddPlacePage,
  PlacePage,
  SetLocationPage
];

@NgModule({
  declarations: PAGES,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAaNhy9oK-a7oMN3eiT0iBNZ5gs7dG6obI'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: PAGES,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
