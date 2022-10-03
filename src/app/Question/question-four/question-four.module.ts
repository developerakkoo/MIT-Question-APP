import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionFourPageRoutingModule } from './question-four-routing.module';

import { QuestionFourPage } from './question-four.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionFourPageRoutingModule
  ],
  declarations: [QuestionFourPage]
})
export class QuestionFourPageModule {}
