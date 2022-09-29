import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionThreePageRoutingModule } from './question-three-routing.module';

import { QuestionThreePage } from './question-three.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionThreePageRoutingModule
  ],
  declarations: [QuestionThreePage]
})
export class QuestionThreePageModule {}
