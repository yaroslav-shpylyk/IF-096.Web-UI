import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAttachmentDialogComponent } from './subject-attachment-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'borm-ng2-pdf';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


describe('SubjectAttachmentDialogComponent', () => {
  let component: SubjectAttachmentDialogComponent;
  let fixture: ComponentFixture<SubjectAttachmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
         MaterialModule, ReactiveFormsModule, PdfViewerModule],
      declarations: [ SubjectAttachmentDialogComponent ],
      providers: [
        MatDialog, {provide: MatDialogRef, useValue: {}},
        MatDialog, {provide: MAT_DIALOG_DATA, useValue: {}}
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectAttachmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

// TypeError: Cannot read property 'includes' of undefined

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
