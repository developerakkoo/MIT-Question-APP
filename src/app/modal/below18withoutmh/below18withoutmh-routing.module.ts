import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Below18withoutmhPage } from './below18withoutmh.page';

const routes: Routes = [
  {
    path: '',
    component: Below18withoutmhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Below18withoutmhPageRoutingModule {}
