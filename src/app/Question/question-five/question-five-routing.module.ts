import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionFivePage } from './question-five.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionFivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionFivePageRoutingModule {}
