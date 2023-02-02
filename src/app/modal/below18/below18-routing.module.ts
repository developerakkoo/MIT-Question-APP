import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Below18Page } from './below18.page';

const routes: Routes = [
  {
    path: '',
    component: Below18Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Below18PageRoutingModule {}
