import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './progress/progress.component';
import { MatSelectModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ProgressService } from './services/progress.service';

@NgModule({
  declarations: [ProgressComponent],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ChartsModule,
  ],
  providers: [
    ProgressService
  ]
})
export class ProgressModule { }
