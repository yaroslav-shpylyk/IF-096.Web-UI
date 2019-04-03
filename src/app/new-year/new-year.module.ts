import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "../material.module";
import { NewYearRoutingModule } from './new-year-routing.module';
import { NewYearComponent } from './new-year/new-year.component';
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
