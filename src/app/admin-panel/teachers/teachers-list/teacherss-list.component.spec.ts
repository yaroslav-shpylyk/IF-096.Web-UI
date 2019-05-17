import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TeachersListComponent } from './teachers-list.component';
import { MaterialModule } from '../../../material.module';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { StickyButtonComponent } from '../../sticky-button/sticky-button.component';
import { TeachersStorageService } from '../../../services/teachers-storage.service';
import { of, from } from 'rxjs';
import * as testData from '../helpers/test-data';

fdescribe('TeacherListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeachersListComponent,
        AvatarComponent,
        StickyButtonComponent
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
      providers: [TeachersStorageService]
    });
  });

  it('should create teacher list component', async(() => {
    const fixture = TestBed.createComponent(TeachersListComponent);
    const teacherList = fixture.debugElement.componentInstance;
    expect(teacherList).toBeTruthy();
  }));

  fit('should build teachers based on received data', async(() => {
    const fixture = TestBed.createComponent(TeachersListComponent);
    const teacherList = fixture.debugElement.componentInstance;
    const teachersStorageService = fixture.debugElement.injector.get(
      TeachersStorageService
    );
    const testTeachersList = [testData.teacherShevchenko, testData.teacherPushkin];

    spyOn(
      teachersStorageService,
      'getTeachersWithClasses'
    ).and.returnValue(of(testTeachersList));
    fixture.detectChanges();

    expect(
      teacherList.mappedTeachers[testData.teacherShevchenko.id].email
    ).toEqual(testData.teacherShevchenko.email);
    expect(
      teacherList.mappedTeachers[testData.teacherPushkin.id].dateOfBirth
    ).toEqual(testData.teacherPushkin.dateOfBirth);
    expect(Object.keys(teacherList.mappedTeachers).length).toEqual(testTeachersList.length);
  }));
});
