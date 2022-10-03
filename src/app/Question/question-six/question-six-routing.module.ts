import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionSixPage } from './question-six.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionSixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionSixPageRoutingModule {}
