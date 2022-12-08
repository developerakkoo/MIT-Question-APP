import { LanguageService } from './services/language.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private lngService: LanguageService, private platform: Platform) {
    this.platform.ready().then(() =>{
      this.lngService.setInitialAppLanguage();
    })
  }
}
