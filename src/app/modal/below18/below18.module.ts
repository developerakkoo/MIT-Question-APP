import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Below18PageRoutingModule } from './below18-routing.module';

import { Below18Page } from './below18.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Below18PageRoutingModule
  ],
  declarations: [Below18Page]
})
export class Below18PageModule {}
