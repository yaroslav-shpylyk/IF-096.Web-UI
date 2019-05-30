import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  TeachersListComponent,
  ConfirmationDialogComponent
} from './teachers-list.component';
import { MaterialModule } from '../../../material.module';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { StickyButtonComponent } from '../../sticky-button/sticky-button.component';
import { TeachersStorageService } from '../../../services/teachers-storage.service';
import { of } from 'rxjs';
import * as testData from '../helpers/test-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditDialogOverviewComponent } from './edit-dialog/edit-dialog';
import { Router } from '@angular/router';
import 'hammerjs';

describe('TeacherListComponent', () => {
  let router: Router;
  let fixtureList: any;
  let teacherList: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeachersListComponent,
        AvatarComponent,
        StickyButtonComponent,
        ConfirmationDialogComponent,
        EditDialogOverviewComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatSlideToggleModule
      ],
      providers: [
        TeachersStorageService,
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: testData.mockClose
        },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    });
    fixtureList = TestBed.createComponent(TeachersListComponent);
    teacherList = fixtureList.debugElement.componentInstance;

    router = TestBed.get(Router);
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    teacherList.ngOnDestroy();
  });

  it('should create teacher list component', () => {
    fixtureList.detectChanges();
    expect(teacherList).toBeTruthy();
  });

  it('should build teachers based on received data', () => {
    const teachersStorageService = fixtureList.debugElement.injector.get(
      TeachersStorageService
    );
    const testTeachersList = [
      testData.teacherShevchenko,
      testData.teacherPushkin
    ];

    spyOn(teachersStorageService, 'getTeachersWithClasses').and.returnValue(
      of(testTeachersList)
    );
    fixtureList.detectChanges();

    expect(
      teacherList.mappedTeachers[testData.teacherShevchenko.id].email
    ).toEqual(testData.teacherShevchenko.email);
    expect(
      teacherList.mappedTeachers[testData.teacherPushkin.id].dateOfBirth
    ).toEqual(testData.teacherPushkin.dateOfBirth);
    expect(Object.keys(teacherList.mappedTeachers).length).toEqual(
      testTeachersList.length
    );
  });

  it('should delete teacher', () => {
    const fixtureConfirmDialog = TestBed.createComponent(
      ConfirmationDialogComponent
    );
    const confirmDialog = fixtureConfirmDialog.debugElement.componentInstance;
    const teachersStorageService = fixtureList.debugElement.injector.get(
      TeachersStorageService
    );
    const fromConfirmDialog = fixtureConfirmDialog.debugElement.injector.get(
      TeachersStorageService
    );

    const testTeachersList = [
      testData.teacherShevchenko,
      testData.teacherPushkin
    ];

    spyOn(teachersStorageService, 'getTeachersWithClasses').and.returnValue(
      of(testTeachersList)
    );
    fixtureList.detectChanges();

    spyOn(fromConfirmDialog, 'deleteTeacher').and.returnValue(
      of({ lastname: '', firstname: '' })
    );
    confirmDialog.data.id = testData.teacherShevchenko.id;
    confirmDialog.onDeleteClick();
    fixtureConfirmDialog.detectChanges();

    expect(Object.keys(teacherList.mappedTeachers).length).toEqual(
      testTeachersList.length - 1
    );
  });

  it('should edit existing teacher', () => {
    const fixtureEditDialog = TestBed.createComponent(
      EditDialogOverviewComponent
    );
    const editDialog = fixtureEditDialog.debugElement.componentInstance;
    const fromList = fixtureList.debugElement.injector.get(
      TeachersStorageService
    );
    const fromEditDialog = fixtureEditDialog.debugElement.injector.get(
      TeachersStorageService
    );
    const testTeachersList = [
      testData.teacherShevchenko,
      testData.teacherPushkin
    ];

    fromEditDialog.editMode = true;
    fromEditDialog.teacherToDisplay = testData.teacherPushkin;
    fromEditDialog.modalsId = testData.teacherPushkin.id;

    spyOn(fromList, 'getTeachersWithClasses').and.returnValue(
      of(testTeachersList)
    );
    fixtureList.detectChanges();
    fixtureEditDialog.detectChanges();
    const updatedTeacher = {
      ...testData.teacherPushkin,
      firstname: 'Тест',
      lastname: 'Тест',
      dateOfBirth: '11.11.1976'
    };

    editDialog.teacherForm.controls.teacherLastname.setValue(
      updatedTeacher.lastname
    );
    editDialog.teacherForm.controls.teacherDateOfBirth.setValue(
      updatedTeacher.dateOfBirth
    );

    spyOn(fromEditDialog, 'updateTeacher').and.returnValue(of(updatedTeacher));

    editDialog.onSubmit();
    fixtureEditDialog.detectChanges();
    fixtureList.detectChanges();
    fixtureList.whenStable().then(() => {
      expect(teacherList.mappedTeachers[updatedTeacher.id].lastname).toEqual(
        updatedTeacher.lastname
      );
      expect(teacherList.mappedTeachers[updatedTeacher.id].dateOfBirth).toEqual(
        updatedTeacher.dateOfBirth
      );
      expect(Object.keys(teacherList.mappedTeachers).length).toEqual(
        testTeachersList.length
      );
    });
  });

  it('should add a new teacher', () => {
    const fixtureEditDialog = TestBed.createComponent(
      EditDialogOverviewComponent
    );
    const editDialog = fixtureEditDialog.debugElement.componentInstance;
    const fromList = fixtureList.debugElement.injector.get(
      TeachersStorageService
    );
    const fromEditDialog = fixtureEditDialog.debugElement.injector.get(
      TeachersStorageService
    );
    const testTeachersList = [
      testData.teacherShevchenko,
      testData.teacherPushkin
    ];
    const newTeacher = testData.teacherGates;

    fromEditDialog.editMode = false;

    spyOn(fromList, 'getTeachersWithClasses').and.returnValue(
      of([...testTeachersList, newTeacher])
    );
    fixtureList.detectChanges();
    fixtureEditDialog.detectChanges();
    const newTeacherInputs = editDialog.teacherForm.controls;

    newTeacherInputs.teacherFirstname.setValue(newTeacher.firstname);
    newTeacherInputs.teacherLastname.setValue(newTeacher.lastname);
    newTeacherInputs.teacherPatronymic.setValue(newTeacher.patronymic);
    newTeacherInputs.teacherDateOfBirth.setValue(newTeacher.dateOfBirth);
    newTeacherInputs.teacherEmail.setValue(newTeacher.email);
    newTeacherInputs.teacherLogin.setValue(newTeacher.login);

    spyOn(fromEditDialog, 'addTeacher').and.returnValue(of(newTeacher));
    spyOn(fromEditDialog, 'getTeachers').and.returnValue(of(newTeacher));

    editDialog.onSubmit();
    fixtureEditDialog.detectChanges();
    fixtureList.detectChanges();
    fixtureList.whenStable().then(() => {
      expect(teacherList.mappedTeachers[newTeacher.id].lastname).toEqual(
        newTeacher.lastname
      );
      expect(teacherList.mappedTeachers[newTeacher.id].dateOfBirth).toEqual(
        newTeacher.dateOfBirth
      );
      expect(Object.keys(teacherList.mappedTeachers).length).toEqual(
        testTeachersList.length + 1
      );
    });
  });
});
