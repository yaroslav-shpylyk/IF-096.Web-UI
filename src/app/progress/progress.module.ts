import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './progress/progress.component';
import {
  MatSelectModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatRadioModule,
  MatExpansionModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [ProgressComponent, ChartComponent],
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
    MatRadioModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProgressModule { }
