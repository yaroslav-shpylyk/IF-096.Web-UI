import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  MatIconModule,
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA } from '@angular/material';
import { PdfPreviewComponent } from './pdf-preview.component';

const mockData = {
  selectedClass: '1-A',
  dateStart: '1-го червня 2019',
  dateEnd: '30-го червня 2019',
  dataSchedule: { mondaySubjects: {value: [{ firstGroup: ' '}] } },
  weekDayName: [{legendDay: 'Понеділок *', dailySubjectsName: 'mondaySubjects'}]
};

describe('PdfPreviewComponent', () => {
  let component: PdfPreviewComponent;
  let fixture: ComponentFixture<PdfPreviewComponent>;
  let debugElement: DebugElement;
  let debugElements: DebugElement[];
  let element: HTMLElement;

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
        { provide: MAT_DIALOG_DATA, useValue: mockData}
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

  it('should display correct data', () => {
    debugElement = fixture.debugElement.query(By.css('#pdfcontent h1'));
    element = debugElement.nativeElement;
    expect(element.innerText).toContain('1-A');
  });

  it('#onDownload is called when save button is clicked', () => {
    spyOn(component, 'onDownload').and.callThrough();
    debugElements = fixture.debugElement.queryAll(By.css('button'));
    debugElement = debugElements.find((elem, i, arr) => {
      if (elem.nativeElement.innerText === 'save_alt') {
        return true;
      }
    });
    debugElement.triggerEventHandler('click', null);
    expect(component.onDownload).toHaveBeenCalled();
  });
});
