import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionThreePage } from './question-three.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionThreePageRoutingModule {}
