import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  MatDatepickerModule,
  MatSelectModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { ScheduleComponent } from './schedule.component';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleData } from '../../models/schedule-data';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let debugElement: DebugElement;
  let debugElements: DebugElement[];
  let element: HTMLElement;
  let scheduleService: ScheduleService;
  let spy: jasmine.Spy;
  let scheduleDataInstance = new ScheduleData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDatepickerModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        ScheduleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    scheduleService = fixture.debugElement.injector.get(ScheduleService);
    spy = spyOn(scheduleService, 'getSchedule').and.returnValue(of(scheduleDataInstance));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.ngOnInit();
    expect(component.frmSchedule.valid).toBeFalsy();
  });

  it('should have form fields', () => {
    debugElement = fixture.debugElement.query(By.css('form'));
    element = debugElement.nativeElement;
    debugElements = fixture.debugElement.queryAll(By.css('mat-form-field'));
    expect(element.innerHTML).toContain('mat-form-field');
    expect(debugElements.length).toBe(3);
  });

  it('dateTermStart/End fields validity', () => {
    let dateTermStart = component.frmSchedule.controls['dateTermStart'];
    let dateTermEnd = component.frmSchedule.controls['dateTermEnd'];
    dateTermStart.setValue(new Date());
    fixture.detectChanges();
    expect(dateTermStart.valid).toBeFalsy();
    dateTermStart.setValue(new Date(2019, 4, 1));
    dateTermEnd.setValue(new Date(2019, 3, 1));
    fixture.detectChanges();
    expect(dateTermEnd.valid).toBeFalsy();
  });

  it('should have button for saving schedule', () => {
    debugElement = fixture.debugElement.query(By.css('button.save-button'));
    element = debugElement.nativeElement;
    expect(element.getAttribute('type')).toBe('submit');
  });

  it('#selectedClass should call ScheduleService', () => {
    component.selectedClass(1);
    expect(spy.calls.any()).toBeTruthy();
  });

  it('#selectedClass should get instance of scheduleData ', () => {
    component.selectedClass(1);
    expect(component.scheduleData).toEqual(scheduleDataInstance);
  });
});
