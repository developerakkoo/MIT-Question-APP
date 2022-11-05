import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelativeSelectPagePage } from './relative-select-page.page';

const routes: Routes = [
  {
    path: '',
    component: RelativeSelectPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelativeSelectPagePageRoutingModule {}
