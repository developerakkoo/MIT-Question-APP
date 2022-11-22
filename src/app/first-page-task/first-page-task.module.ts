import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstPageTaskPageRoutingModule } from './first-page-task-routing.module';

import { FirstPageTaskPage } from './first-page-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstPageTaskPageRoutingModule
  ],
  declarations: [FirstPageTaskPage]
})
export class FirstPageTaskPageModule {}
