import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AddStudentComponent, AddStudentModalComponent } from './add-student.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../services/class.service';
import { of, defer } from 'rxjs';
import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from '../../students-list/loading-spinner/loading-spinner.component';

describe('AddStudentComponent', () => {

  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

  class ClassServiceSpy {
    testclass: any = {
      id: 42,
      isActive: true,
      className: '10A',
      classDescription: null,
      classYear: 2018,
      numOfStudents: 24,
    };

    getClasses = jasmine.createSpy('getClasses').and.callFake(
      () => asyncData(Object.assign({}, this.testclass))
    );
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, ReactiveFormsModule],
      declarations: [AddStudentComponent, AvatarComponent, LoadingSpinnerComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ClassService, useClass: ClassServiceSpy }
      ],
    })
      .compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(AddStudentComponent);
    const component = fixture.componentInstance;
    const classService = fixture.debugElement.injector.get(ClassService) as any;
    return { fixture, component, classService };
  }

  function newEvent(eventName: string, bubbles = false, cancelable = false) {
    const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should have called `testclass`', async () => {
    const { fixture, classService } = setup();
    expect(classService.getClasses.calls.count()).toBe(0, 'getHero called once');
    fixture.detectChanges();
    expect(classService.getClasses.calls.count()).toBe(1, 'getHero called twice');
  });

  it('should have mock classList from service', fakeAsync(() => {
    const { component, fixture } = setup();
    fixture.detectChanges();
    tick();
    const allClassesFromMock = new ClassServiceSpy();
    expect(component.allClasses).toEqual(allClassesFromMock.testclass);
  }));

  it('should save stub lastname change', () => {

    const { component, fixture} = setup();
    fixture.detectChanges();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    const newName = 'Попович';
    input.value = newName;
    input.dispatchEvent(newEvent('input'));
    expect(component.addStudent.value.lastname).toBe(newName, 'component hero has new name');
  });
});

@NgModule({
  imports: [
    HttpClientTestingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddStudentComponent,
    AvatarComponent,
    LoadingSpinnerComponent
  ],
  entryComponents: [
    AddStudentComponent
  ]
})
export class TestModule { }

describe('AddStudentModalComponent', () => {
  let component: AddStudentModalComponent;
  let fixture: ComponentFixture<AddStudentModalComponent>;
  const mockId = 124;
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
        AddStudentModalComponent,
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
    fixture = TestBed.createComponent(AddStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read route params', () => {
    expect(component.classId).toEqual(mockClassId);
    expect(component.paramId).toEqual(mockId);
  });
});
