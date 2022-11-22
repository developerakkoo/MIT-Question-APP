import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstPageTaskPage } from './first-page-task.page';

const routes: Routes = [
  {
    path: '',
    component: FirstPageTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstPageTaskPageRoutingModule {}
