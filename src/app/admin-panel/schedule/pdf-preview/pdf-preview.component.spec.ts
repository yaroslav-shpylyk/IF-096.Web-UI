import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA } from '@angular/material';
import { PdfPreviewComponent } from './pdf-preview.component';

describe('PdfPreviewComponent', () => {
  let component: PdfPreviewComponent;
  let fixture: ComponentFixture<PdfPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfPreviewComponent ],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule
      ],
      providers: [
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
