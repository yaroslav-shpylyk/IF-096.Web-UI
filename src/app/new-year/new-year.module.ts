import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewYearRoutingModule } from './new-year-routing.module';
import { NewYearComponent } from './new-year/new-year.component';
import { MaterialModule } from '../material.module';
import {MatListModule, MatCardModule, MatExpansionModule, MatCheckboxModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [NewYearComponent, FilterPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NewYearRoutingModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class NewYearModule { }
