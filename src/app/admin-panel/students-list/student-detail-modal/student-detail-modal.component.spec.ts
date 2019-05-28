import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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


describe('StudentDetailModalComponent', () => {
  let component: StudentDetailModalComponent;
  let fixture: ComponentFixture<StudentDetailModalComponent>;

  let studentService: any;
  const mockId = 13;
  const mockClassId = 23;
  let mockStudentService: any;



  beforeEach(() => {

    mockStudentService = {
      avatar: null,
      classId: 52,
      classe: '7-Б',
      dateOfBirth: '2002-02-05',
      email: '',
      firstname: 'Артур',
      id: 0,
      lastname: 'Годованваі',
      login: 'artur',
      patronymic: 'Ігорович',
      phone: '',
    };

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
        MatDialog, { provide: MatDialogRef, useValue: {} },
        MatDialog, { provide: MAT_DIALOG_DATA, useValue: {} },
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
        { provide: StudentsService, useValue: mockStudentService }
      ],
    })
      .compileComponents();




    fixture = TestBed.createComponent(StudentDetailModalComponent);
    component = fixture.componentInstance;

    studentService = TestBed.get(StudentsService);
    console.log('studentService', studentService);

    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
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
    console.log('my', component);
    fixture.detectChanges();
    console.log(fixture.nativeElement.querySelector('mat-card-title'));
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read route params', () => {
    // expect(component.classId).toEqual(mockClassId);
    expect(component.paramId).toEqual(mockId);
  });

  it('should ')

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
