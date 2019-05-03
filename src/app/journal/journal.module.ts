import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassJournalComponent } from './journal/class-journal/class-journal.component';
import { SubjectJournalComponent } from './journal/class-journal/subject-journal/subject-journal.component';
import { BottomSheetOverviewSheetComponent } from './journal/class-journal/subject-journal/bottom-sheet-overview.components';
// tslint:disable-next-line:max-line-length
import { HomeworkBottomSheetOverviewSheetComponent } from './journal/class-journal/subject-journal/homework-bottom-sheet-overview.components';
import { MatTooltipModule } from '@angular/material';
import {
  SubjectAttachmentDialogComponent
} from './journal/class-journal/subject-journal/subject-attachment-dialog/subject-attachment-dialog.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    JournalComponent,
    ClassJournalComponent,
    SubjectJournalComponent,
    BottomSheetOverviewSheetComponent,
    HomeworkBottomSheetOverviewSheetComponent,
    SubjectAttachmentDialogComponent
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  exports: [
    MatTooltipModule
  ],
  entryComponents: [
    BottomSheetOverviewSheetComponent,
    HomeworkBottomSheetOverviewSheetComponent,
    SubjectAttachmentDialogComponent
  ]
})
export class JournalModule {}
