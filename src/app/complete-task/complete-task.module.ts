import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteTaskPageRoutingModule } from './complete-task-routing.module';

import { CompleteTaskPage } from './complete-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    CompleteTaskPageRoutingModule,
  ],
  declarations: [CompleteTaskPage,]
})
export class CompleteTaskPageModule {}
