import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Above18PageRoutingModule } from './above18-routing.module';

import { Above18Page } from './above18.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Above18PageRoutingModule
  ],
  declarations: [Above18Page]
})
export class Above18PageModule {}
