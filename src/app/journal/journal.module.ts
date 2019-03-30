import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';

@NgModule({
  declarations: [JournalComponent],
  imports: [
    CommonModule,
    JournalRoutingModule
  ]
})
export class JournalModule { }
