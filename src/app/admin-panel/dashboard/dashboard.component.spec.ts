import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { streamData } from './mocks/stream-data';
import { DebugElement } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { TeacherService } from '../../services/teacher.service';
import { ClassService} from '../../services/class.service';
import { StudentsService } from '../../services/students.service';
import { from, of} from 'rxjs';
import {AsyncStreamValidator} from './validators/async-stream.validator';
import { chartForm } from './mocks/chart-form';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;
  let subjectService: SubjectService;
  let teacherService: TeacherService;
  let classService: ClassService;
  let studentService: StudentsService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        ChartsModule
      ],
      declarations: [DashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update bar chart', () => {
    (component as any).updateChart(streamData);
    expect(component.studentsOfStream).toBe(23);
    expect(component.classesStream).toBe(3);
    expect(component.chartLabels.length).toBe(0);
    for (let i = 0; i < streamData.studentsData.length; i++) {
      expect(component.chartData[i].data[0]).toBe(streamData.studentsData[i].numOfStudents);
      expect(component.chartData[i].label).toBe(streamData.studentsData[i].className);
    }
  });
  it('should get numbers of teachers, student, classes, subjects when component init', () => {
    const arrayOfNumbers = new Array(7);
    subjectService = debugElement.injector.get(SubjectService);
    teacherService = debugElement.injector.get(TeacherService);
    classService = debugElement.injector.get(ClassService);
    studentService = debugElement.injector.get(StudentsService);
    spyOn(subjectService, 'getSubjects').and.returnValue(from([arrayOfNumbers]));
    spyOn(teacherService, 'getTeachers').and.returnValue(from([arrayOfNumbers]));
    spyOn(classService, 'getClasses').and.returnValue(from([arrayOfNumbers]));
    spyOn(studentService, 'getNumberOfStudents').and.returnValue(from([arrayOfNumbers.length]));
    spyOn(classService, 'getClassesByStream').and.returnValue(of(streamData));
    component.ngOnInit();
    expect(component.data.teachers).toBe(7);
    expect(component.data.students).toBe(7);
    expect(component.data.classes).toBe(7);
    expect(component.data.subjects).toBe(7);
  });
  it('should change chart type when valid form is submitted', () => {
    classService = debugElement.injector.get(ClassService);
    spyOn(classService, 'getClassesByStream').and.returnValue(of(streamData));
    const form = chartForm(classService);
    form.patchValue({
      classes: 2,
      graphType: 'pie'
    });
    component.submitChartChange(form);
    expect(component.chartType).toBe('pie');
  });
  it('should set error to class field when it\'s not valid', () => {
    classService = debugElement.injector.get(ClassService);
    spyOn(classService, 'getClassesByStream').and.returnValue(of(streamData));
    const form = chartForm(classService);
    component.submitChartChange(form);
    expect(form.controls.classes.hasError('required')).toBe(true);
  });
  it('should set error to class field, when there are no classes on stream', () => {
    classService = debugElement.injector.get(ClassService);
    const noData = streamData;
    noData.allStudents = 0;
    spyOn(classService, 'getClassesByStream').and.returnValue(of(noData));
    const form = chartForm(classService);
    form.patchValue({
      classes: 2,
      graphType: 'pie'
    });
    component.submitChartChange(form);
    expect(form.controls.classes.hasError('noClasses')).toBe(true);
  });
});
