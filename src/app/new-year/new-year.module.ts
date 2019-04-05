import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewYearRoutingModule } from './new-year-routing.module';
import { NewYearComponent } from './new-year/new-year.component';
import { MaterialModule } from '../material.module';
import {MatListModule, MatCardModule, MatExpansionModule} from '@angular/material';

@NgModule({
  declarations: [NewYearComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NewYearRoutingModule,
    MatListModule, 
    MatCardModule,
    MatExpansionModule
  ]
})
export class NewYearModule { }
