import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteTaskPage } from './complete-task.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteTaskPageRoutingModule {}
