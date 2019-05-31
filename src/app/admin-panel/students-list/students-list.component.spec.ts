import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
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
import { MatTableDataSource } from '@angular/material';
import { Observable, Observer } from 'rxjs';

describe('StudentsListComponent', () => {
  // let component: StudentsListComponent;
  // let fixture: ComponentFixture<StudentsListComponent>;

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
        AvatarComponent
      ]
    })
      .compileComponents();
  }));

  // beforeEach(() => {
  //   function setup() {
  //     const fixture = TestBed.createComponent(StudentsListComponent);
  //     const component = fixture.componentInstance;
  //     const userService = fixture.debugElement.injector.get(StudentsService);

  //     return { fixture, component, userService };
  //   }

  // });




  function setup() {
    const fixture = TestBed.createComponent(StudentsListComponent);
    const component = fixture.componentInstance;
    const userService = fixture.debugElement.injector.get(StudentsService);

    return { fixture, component, userService };
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

    const arrOfStudent = [ student ];
    component.dataSource = new MatTableDataSource(arrOfStudent);

    component.deleteStudent(1);
    tick();
    fixture.detectChanges();
    expect(userService.deleteStudent).toHaveBeenCalledWith(1);
  }));

  it('should call delete student method 2', (() => {
    const { component, fixture } = setup();
    const student = {
      classId: 2,
      firstname: 'Denys',
      id: 1,
      lastname: 'string',
      login: 'string',
      patronymic: 'string'
     } as Student;
    const arrOfStudent = [ student ];
    component.dataSource = new MatTableDataSource(arrOfStudent);


    spyOn(component, 'deleteStudent').and.returnValue(() => {});
    const button = fixture.nativeElement.querySelector('#deleteStudent');
    button.click();
    fixture.detectChanges();
    expect(component.deleteStudent).toHaveBeenCalled();
  }));





});
