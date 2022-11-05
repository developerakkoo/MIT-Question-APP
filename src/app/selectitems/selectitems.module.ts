import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectitemsPageRoutingModule } from './selectitems-routing.module';

import { SelectitemsPage } from './selectitems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectitemsPageRoutingModule
  ],
  declarations: [SelectitemsPage]
})
export class SelectitemsPageModule {}
