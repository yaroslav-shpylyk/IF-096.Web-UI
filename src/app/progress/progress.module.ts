import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [ProgressComponent],
  imports: [
    CommonModule,
    ProgressRoutingModule
  ]
})
export class ProgressModule { }
