import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Above18Page } from './above18.page';

const routes: Routes = [
  {
    path: '',
    component: Above18Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Above18PageRoutingModule {}
