import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionFourPageRoutingModule } from './question-four-routing.module';

import { QuestionFourPage } from './question-four.page';
import * as CanvasJSAngularChart from './../../../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionFourPageRoutingModule
  ],
  declarations: [QuestionFourPage,CanvasJSChart]
})
export class QuestionFourPageModule {}
