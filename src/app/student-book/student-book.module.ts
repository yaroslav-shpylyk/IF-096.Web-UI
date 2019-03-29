import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentBookRoutingModule } from './student-book-routing.module';
import { StudentBookComponent } from './student-book/student-book.component';

@NgModule({
  declarations: [StudentBookComponent],
  imports: [
    CommonModule,
    StudentBookRoutingModule
  ]
})
export class StudentBookModule { }
