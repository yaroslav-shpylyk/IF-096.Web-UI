import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

fdescribe('TeacherListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeachersListComponent,
        AvatarComponent,
        StickyButtonComponent,
        ConfirmationDialogComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        MatSlideToggleModule,
        RouterTestingModule
      ],
      providers: [
        TeachersStorageService,
        {
          provide: MatDialogRef,
          useValue: testData.dummyMethod
        },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    });
  });

  it('should create teacher list component', async(() => {
    const fixture = TestBed.createComponent(TeachersListComponent);
    const teacherList = fixture.debugElement.componentInstance;
    expect(teacherList).toBeTruthy();
  }));

  it('should build teachers based on received data', async(() => {
    const fixture = TestBed.createComponent(TeachersListComponent);
    const teacherList = fixture.debugElement.componentInstance;
    const teachersStorageService = fixture.debugElement.injector.get(
      TeachersStorageService
    );
    const testTeachersList = [
      testData.teacherShevchenko,
      testData.teacherPushkin
    ];

    spyOn(teachersStorageService, 'getTeachersWithClasses').and.returnValue(
      of(testTeachersList)
    );
    fixture.detectChanges();

    expect(
      teacherList.mappedTeachers[testData.teacherShevchenko.id].email
    ).toEqual(testData.teacherShevchenko.email);
    expect(
      teacherList.mappedTeachers[testData.teacherPushkin.id].dateOfBirth
    ).toEqual(testData.teacherPushkin.dateOfBirth);
    expect(Object.keys(teacherList.mappedTeachers).length).toEqual(
      testTeachersList.length
    );
  }));

  fit('should delete teacher', async(() => {
    const fixtureList = TestBed.createComponent(TeachersListComponent);
    const fixtureConfirmDialog = TestBed.createComponent(
      ConfirmationDialogComponent
    );
    const teacherList = fixtureList.debugElement.componentInstance;
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
  }));
});
