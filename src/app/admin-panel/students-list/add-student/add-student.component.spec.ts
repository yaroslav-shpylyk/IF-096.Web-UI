import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentComponent, AddStudentModalComponent } from './add-student.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NgModule } from '@angular/core';

describe('AddStudentComponent', () => {
  let component: AddStudentComponent;
  let fixture: ComponentFixture<AddStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, ReactiveFormsModule],
      declarations: [ AddStudentComponent, AvatarComponent ],
      providers: [
        MatDialog, {provide: MatDialogRef, useValue: {}},
        MatDialog, {provide: MAT_DIALOG_DATA, useValue: {}}
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentComponent);
    component = fixture.componentInstance;
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
    ReactiveFormsModule
  ],
  declarations: [
    AddStudentComponent,
    AvatarComponent
  ],
  entryComponents: [
    AddStudentComponent
  ]
})
export class TestModule {}

describe('AddStudentModalComponent', () => {
  let component: AddStudentModalComponent;
  let fixture: ComponentFixture<AddStudentModalComponent>;

  const mockId = 1234;
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
        {provide: MatDialogRef, useValue: {}},
        MatDialog,
        {provide: MAT_DIALOG_DATA, useValue: {}},
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

  it('openDialog should open AddStudentComponent', done => {
    component.dialog
      .open(AddStudentComponent, {})
      .afterOpen()
      .subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });
  });
});
