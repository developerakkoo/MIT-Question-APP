import { PopoverController } from '@ionic/angular';
import { LanguageService } from './../services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-popover',
  templateUrl: './language-popover.page.html',
  styleUrls: ['./language-popover.page.scss'],
})
export class LanguagePopoverPage implements OnInit {
  language = [];
  selected = '';
  constructor(private lngService: LanguageService,
              private popoverController: PopoverController) { }

  ngOnInit() {
    this.language = this.lngService.getLanguages();
    this.selected = this.lngService.selected;
  }

  select(lng){
    this.lngService.setLanguage(lng);
    this.popoverController.dismiss();
  }
}
