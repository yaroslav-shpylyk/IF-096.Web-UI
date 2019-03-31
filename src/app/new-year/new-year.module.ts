import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewYearRoutingModule } from './new-year-routing.module';
import { NewYearComponent } from './new-year/new-year.component';

@NgModule({
  declarations: [NewYearComponent],
  imports: [
    CommonModule,
    NewYearRoutingModule
  ]
})
export class NewYearModule { }
