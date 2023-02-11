import { LanguagePopoverPageModule } from './language-popover/language-popover.module';
import { LanguagePopoverPage } from './language-popover/language-popover.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from  'ng-otp-input';
import { IonicStorageModule } from '@ionic/storage-angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const  firebaseConfig = {
  apiKey: "AIzaSyB_59XKpXL_bFhA9CGZ_-dbJ5eGk1KupQs",
  authDomain: "mindlabyrinth-84d32.firebaseapp.com",
  projectId: "mindlabyrinth-84d32",
  storageBucket: "mindlabyrinth-84d32.appspot.com",
  messagingSenderId: "1068500924245",
  appId: "1:1068500924245:web:ab884b7d9c5b6fe077a1dc",
  measurementId: "G-R1CS765GMB"
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireDatabaseModule, AngularFirestoreModule, AngularFireStorageModule, AppRoutingModule,
    
    HttpClientModule,NgOtpInputModule, 
    IonicStorageModule.forRoot({
    name: "mitest"
  }),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
    }
  })
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
