import { async, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { StudentsListComponent } from './students-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { Student } from '../../models/student';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { StudentsService } from '../../services/students.service';
import { ClassService } from '../../services/class.service';
import { Observable, Observer, defer } from 'rxjs';
import { LoadingSpinnerComponent } from '../students-list/loading-spinner/loading-spinner.component';

describe('StudentsListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        MatSlideToggleModule,
        RouterTestingModule
      ],
      declarations: [
        StudentsListComponent,
        AvatarComponent,
        LoadingSpinnerComponent
      ]
    })
      .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(StudentsListComponent);
    const component = fixture.componentInstance;
    const userService = fixture.debugElement.injector.get(StudentsService);
    const classServiceMock = fixture.debugElement.injector.get(ClassService);
    return { fixture, component, userService, classServiceMock };
  }

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should call delete student method', fakeAsync(() => {
    const { component, fixture, userService } = setup();
    const student = {
      classId: 2,
      firstname: 'Denys',
      id: 1,
      lastname: 'string',
      login: 'string',
      patronymic: 'string'
    } as Student;
    spyOn(userService, 'deleteStudent').and.returnValue(
      Observable.create((observer: Observer<any>) => {
        observer.complete();
        return observer;
      }));
    component.deleteStudent(1);
    tick();
    fixture.detectChanges();
    expect(userService.deleteStudent).toHaveBeenCalledWith(1);
  }));

  it('should call delete student method', fakeAsync(() => {
    const { component, fixture, userService, classServiceMock } = setup();
    function asyncData<T>(data: T) {
      return defer(() => Promise.resolve(data));
    }
    spyOn(classServiceMock, 'getClasses').and.callFake(
      (active) => {
        if (active === 'active') {
          return asyncData(Object.assign({}, {
            id: 42,
            isActive: true,
            className: '10A',
            classDescription: null,
            classYear: 2018,
            numOfStudents: 24,
          }))
            ;
        } else {
          return asyncData(Object.assign({}, {
            id: 42,
            isActive: true,
            className: '10A',
            classDescription: null,
            classYear: 2018,
            numOfStudents: 24,
          }));
        }
      });
    fixture.detectChanges();
    expect(classServiceMock.getClasses).toHaveBeenCalled();
    tick();
  }));
});
