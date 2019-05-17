import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatSelectModule, MatIconModule } from '@angular/material';
import { DailyScheduleComponent } from './daily-schedule.component';

describe('DailyScheduleComponent', () => {
  let component: DailyScheduleComponent;
  let fixture: ComponentFixture<DailyScheduleComponent>;
  let debugElement: DebugElement;
  let debugElements: DebugElement[];
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyScheduleComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyScheduleComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setting input property sets placeholder into the template', () => {
    component.legendDay = 'Day name';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('legend'));
    element = debugElement.nativeElement;
    expect(element.innerText).toBe('Day name');
  });

  it('initialization emits addDailySubjects event', fakeAsync(() => {
    spyOn(component.addDailySubjects, 'emit');
    component.ngOnInit();
    tick();
    expect(component.addDailySubjects.emit).toHaveBeenCalled();
  }));

  it('initialization should emits dailySchedule data', () => {
    component.addDailySubjects.subscribe((value) => {
      expect(Object.keys(value.controls[0].controls)).toContain('firstGroup');
      expect(Object.keys(value.controls[0].controls)).toContain('secondGroup');
    });
    component.ngOnInit();
  });

  it('#removeSubject is called when delete button is clicked', () => {
    spyOn(component, 'removeSubject').and.callThrough();
    debugElements = fixture.debugElement.queryAll(By.css('button'));
    debugElement = debugElements.find((element, i, arr) => {
      if (element.nativeElement.innerText == 'delete') {
        return true;
      }
    });
    debugElement.triggerEventHandler('click', 1);
    expect(component.removeSubject).toHaveBeenCalled();
  });

  it('#addSecondGroup is called when add button is clicked', () => {
    spyOn(component, 'addSecondGroup').and.callThrough();
    debugElements = fixture.debugElement.queryAll(By.css('button'));
    debugElement = debugElements.find((element, i, arr) => {
      if (element.nativeElement.innerText == 'add_box') {
        return true;
      }
    });
    debugElement.triggerEventHandler('click', 1);
    expect(component.addSecondGroup).toHaveBeenCalled();
  });
});
