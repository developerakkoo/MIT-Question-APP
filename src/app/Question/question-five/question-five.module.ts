import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionFivePageRoutingModule } from './question-five-routing.module';

import { QuestionFivePage } from './question-five.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QuestionFivePageRoutingModule
  ],
  declarations: [QuestionFivePage]
})
export class QuestionFivePageModule {}
