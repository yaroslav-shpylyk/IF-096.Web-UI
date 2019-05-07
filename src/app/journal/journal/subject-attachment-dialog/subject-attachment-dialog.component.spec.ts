import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAttachmentDialogComponent } from './subject-attachment-dialog.component';

describe('SubjectAttachmentDialogComponent', () => {
  let component: SubjectAttachmentDialogComponent;
  let fixture: ComponentFixture<SubjectAttachmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectAttachmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectAttachmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
