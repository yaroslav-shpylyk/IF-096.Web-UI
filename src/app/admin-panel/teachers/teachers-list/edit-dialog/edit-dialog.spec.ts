import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as testData from '../../helpers/test-data';

import { AvatarComponent } from '../../../../shared/avatar/avatar.component';
import { EditDialogOverviewComponent } from './edit-dialog';
import { MaterialModule } from '../../../../material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeachersStorageService } from '../../../../services/teachers-storage.service';

fdescribe('TeacherListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarComponent, EditDialogOverviewComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatSlideToggleModule
      ],
      providers: [
        TeachersStorageService,
        {
          provide: MatDialogRef,
          useValue: testData.mockClose
        },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]

    });
  });

  it('should create EditDialogOverviewComponent', () => {
    const fixture = TestBed.createComponent(EditDialogOverviewComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
