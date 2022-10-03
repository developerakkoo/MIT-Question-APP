import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionSixPageRoutingModule } from './question-six-routing.module';

import { QuestionSixPage } from './question-six.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionSixPageRoutingModule
  ],
  declarations: [QuestionSixPage]
})
export class QuestionSixPageModule {}
