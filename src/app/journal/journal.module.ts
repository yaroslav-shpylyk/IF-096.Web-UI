import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [JournalComponent],
  imports: [
    CommonModule,
    JournalRoutingModule,
    MaterialModule
  ]
})
export class JournalModule { }
