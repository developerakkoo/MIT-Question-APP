import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelativeSelectPagePageRoutingModule } from './relative-select-page-routing.module';

import { RelativeSelectPagePage } from './relative-select-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPipeModule,
    RelativeSelectPagePageRoutingModule
  ],
  declarations: [RelativeSelectPagePage]
})
export class RelativeSelectPagePageModule {}
