import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ClassJournalComponent } from './journal/class-journal/class-journal.component';
import { SubjectJournalComponent } from './journal/class-journal/subject-journal/subject-journal.component';

@NgModule({
  declarations: [JournalComponent, ClassJournalComponent, SubjectJournalComponent],
  imports: [
    CommonModule,
    JournalRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class JournalModule { }
