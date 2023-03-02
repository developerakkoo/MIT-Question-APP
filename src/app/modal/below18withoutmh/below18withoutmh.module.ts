import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Below18withoutmhPageRoutingModule } from './below18withoutmh-routing.module';

import { Below18withoutmhPage } from './below18withoutmh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Below18withoutmhPageRoutingModule
  ],
  declarations: [Below18withoutmhPage]
})
export class Below18withoutmhPageModule {}
