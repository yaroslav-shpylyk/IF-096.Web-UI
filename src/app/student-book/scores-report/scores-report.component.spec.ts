import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoresReportComponent } from './scores-report.component';
import { SubjectMarksComponent } from './subject-marks/subject-marks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentBookData } from '../../models/student-book-data';
import { StudentBookService } from '../../services/student-book.service';
import { lessonsMockData } from '../mocks/lessons-data';
import * as _moment from 'moment';
import { of } from 'rxjs';

describe('ScoresReportComponent', () => {
  let component: ScoresReportComponent;
  let fixture: ComponentFixture<ScoresReportComponent>;
  const moment = _moment;
  const allLessons: StudentBookData[] = lessonsMockData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
       ],
      declarations: [ ScoresReportComponent, SubjectMarksComponent ],
      providers: [ StudentBookService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const mockDateSeptember = moment('2018-11-11').toDate();
    jasmine.clock().mockDate(mockDateSeptember);
    fixture = TestBed.createComponent(ScoresReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit should set correct range for datepicker and group the data taken from the server by lesson title', () => {
    const lessonsOfFirstSemestr: StudentBookData[] = allLessons.slice(0, 2);
    const studentBookService = fixture.debugElement.injector.get(StudentBookService);
    const groupedLessons = Object.create(null);
    groupedLessons[lessonsMockData[0].subjectName] = [lessonsMockData[0]];
    groupedLessons[lessonsMockData[1].subjectName] = [lessonsMockData[1]];
    spyOn(studentBookService, 'getAllMarks').and.returnValue(of(lessonsOfFirstSemestr));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      expect(component.startPickerValue).toEqual(moment('2018-09-01'));
      expect(component.endPickerValue).toEqual(moment());
      expect(component.marksGroupedBySubject).toEqual(groupedLessons);
    });
  });


  it('should return correct education year and date of current semester', () => {
    expect(component.educationYear).toBe(2018);
    expect(component.dateOfSemestStart).toEqual(moment('2018-09-01'));
    const mockDateJanuary = moment('2019-01-18').toDate();
    jasmine.clock().mockDate(mockDateJanuary);
    expect(component.educationYear).toBe(2018);
    expect(component.dateOfSemestStart).toEqual(moment('2019-01-14'));
  });

  it('should switch between custom range and templates of ranges on click toggle', () => {
    const compiled = fixture.debugElement.nativeElement;
    const switcher = compiled.querySelector('mat-checkbox label');
    let datePickerElements = compiled.querySelectorAll('mat-form-field');
    expect(compiled.innerHTML).toContain('mat-chip');
    expect(datePickerElements.length).toBe(0);
    expect(component.isCustomDateRangeFilter).toBeFalsy();

    switcher.click();
    fixture.detectChanges();
    datePickerElements = compiled.querySelectorAll('mat-form-field');
    console.log(datePickerElements);
    expect(component.isCustomDateRangeFilter).toBeTruthy();
    expect(compiled.innerHTML).toContain('mat-form-field');
    expect(datePickerElements.length).toBe(2);
  });

  it('should set update max and min values for datepickes' , async( () => {
    const compiled = fixture.debugElement.nativeElement;

    // One month range via matchip templates
    const matChipMonth = compiled.querySelectorAll('mat-chip')[1];
    matChipMonth.click();
    expect(moment('2018-11-11').isSame(component.endPickerValue)).toBeTruthy();
    expect(moment('2018-11-10').isSame(component.startPickerMax)).toBeTruthy();
    expect(moment('2018-10-12').isSame(component.endPickerMin)).toBeTruthy();
    expect(component.startPickerValue).toEqual(component.dateRangeFilters[1].value);

    // Custom range via datepickes
    component.startPickerValue = moment('2018-11-11');
    component.endPickerValue = moment('2018-12-11');
    expect(moment('2018-12-10').isSame(component.startPickerMax)).toBeTruthy();
    expect(moment('2018-11-12').isSame(component.endPickerMin)).toBeTruthy();
  }));

});
