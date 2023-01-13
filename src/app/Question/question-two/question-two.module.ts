import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionTwoPageRoutingModule } from './question-two-routing.module';

import { QuestionTwoPage } from './question-two.page';
import { FilterPipeModule } from 'ngx-filter-pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FilterPipeModule,
    QuestionTwoPageRoutingModule,
  ],
  declarations: [QuestionTwoPage]
})
export class QuestionTwoPageModule {}
