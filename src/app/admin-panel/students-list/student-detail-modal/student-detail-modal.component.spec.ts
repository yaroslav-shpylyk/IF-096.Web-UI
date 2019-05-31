import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { StudentDetailModalComponent, StudentDatailsComponent } from './student-detail-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentsService } from '../../../services/students.service';
import { Observable, Observer } from 'rxjs';
import { Student } from '../../../models/student';


describe('StudentDetailModalComponent', () => {
  // let component: StudentDetailModalComponent;
  // let fixture: ComponentFixture<StudentDetailModalComponent>;

  const mockId = 13;
  const mockClassId = 23;


  beforeEach(() => {

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      declarations: [StudentDetailModalComponent, AvatarComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { paramId: '2' } },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: mockId
            }),
            queryParams: of({
              classId: mockClassId
            })
          }
        },
        { provide: Router, useValue: routerSpy }
        // { provide: StudentsService, useValue: studentServiceStub }
      ],
    })
      .compileComponents();


  });

  describe(':', () => {
    function setup() {
      const fixture = TestBed.createComponent(StudentDetailModalComponent);
      const component = fixture.debugElement.componentInstance;
      const studentAsyncService = fixture.debugElement.injector.get(
        StudentsService
      );
      const router = fixture.debugElement.injector.get(Router);

      return { fixture, component, studentAsyncService, router };
    }

    it('should create', () => {
      const { component } = setup();


      expect(component).toBeTruthy();
    });


    it('should get mock studentService from injector', fakeAsync(() => {

      const { fixture, component, studentAsyncService } = setup();

      const mockStudent = {
        avatar: null,
        classId: 52,
        classe: '7-Б',
        dateOfBirth: '2002-02-05',
        email: '',
        firstname: 'Артур',
        id: 0,
        lastname: 'Макар',
        login: 'artur',
        patronymic: 'Ігорович',
        phone: '',
      };



      spyOn(studentAsyncService, 'getOneStudent').and.returnValue(
        Observable.create((observer: Observer<Student>) => {
          observer.next(mockStudent);
          return observer;

        }));


      tick();

      fixture.detectChanges();

      console.log('data', component.data);
      const name = fixture.debugElement.nativeElement.querySelector('mat-card-title');
      const details = fixture.debugElement.nativeElement.querySelector('mat-card-content');



      expect(name.children[0].textContent).toBe('Макар Артур');

      expect(name.children[1].textContent).toBe('Ігорович');



      console.log('22', component.classId);
      expect(details.children[1].textContent).not.toBe('');




    }));


    //

    it('should click editStudent will navigate', () => {

      const { fixture, component, studentAsyncService, router } = setup();

      const buttonEdit = fixture.nativeElement.querySelector('#btn');
      console.log(buttonEdit);
      fixture.detectChanges();
      buttonEdit.click();
      const call = spyOn(component, 'editStudent') as jasmine.Spy;

      // component.editStudent();


      // const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

      const spy = router.navigate as jasmine.Spy;
      // console.log('spy',spy);
      const navArgs = spy.calls.first().args[0];

      // const navigateSpy = spyOn(router, 'navigate');
      console.dir(navArgs);
      console.dir(['admin-panel', 'students', '2', 'edit']);

      console.dir([navArgs] === ['admin-panel', 'students', '2', 'edit']);
      expect(navArgs).toEqual(['admin-panel', 'students', '2', 'edit']);

      // expect(component.editStudent).toHaveBeenCalled();



      // component.editStudent();
      // expect(navigateSpy).toHaveBeenCalledWith(['admin-panel', 'students', 23, 'edit']);


      // expect(navArgs).toBe('/admin-panel/students/23/edit/',
      //   'should nav to HeroDetail for first hero');
    }
    );

    //


  });







});

@NgModule({
  imports: [
    HttpClientTestingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    StudentDetailModalComponent,
    AvatarComponent
  ],
  entryComponents: [
    StudentDetailModalComponent
  ]
})
export class TestModule { }

describe('StudentDatailsComponent', () => {
  let component: StudentDatailsComponent;
  let fixture: ComponentFixture<StudentDatailsComponent>;

  const mockId = 23;
  const mockClassId = 123;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        TestModule
      ],
      declarations: [
        StudentDatailsComponent,
      ],
      providers: [
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: mockId
            }),
            queryParams: of({
              classId: mockClassId
            })
          }
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDatailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read route params', () => {
    // expect(component.classId).toEqual(mockClassId);
    expect(component.paramId).toEqual(mockId);
  });



  //   it('openDialog should open StudentDetailModalComponent', done => {
  //     component.dialog
  //       .open(StudentDetailModalComponent, {
  //         width: '250px',
  //         data: { paramId: 23 }
  //       });
  //       expect(true).toBeTruthy();
  //     //   .afterOpen()
  //     //   .subscribe(() => {
  //     //     expect(true).toBeTruthy();
  //     //   });
  //   });
});
