import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from  'ng-otp-input';
import { IonicStorageModule } from '@ionic/storage-angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDXK8zoD3NY2hBcysLAEyzaAK36v3iFoTg",
  authDomain: "doctor-ca445.firebaseapp.com",
  databaseURL: "https://doctor-ca445.firebaseio.com",
  projectId: "doctor-ca445",
  storageBucket: "doctor-ca445.appspot.com",
  messagingSenderId: "398311684583",
  appId: "1:398311684583:web:90e02ad66c9cb3daca6542"
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),AngularFireModule.initializeApp(firebaseConfig), AngularFireDatabaseModule, AngularFirestoreModule, AppRoutingModule,HttpClientModule,NgOtpInputModule, IonicStorageModule.forRoot({
    name: "mitest"
  })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
