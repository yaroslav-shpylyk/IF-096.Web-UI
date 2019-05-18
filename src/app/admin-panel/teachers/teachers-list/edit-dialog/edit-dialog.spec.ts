import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AvatarComponent } from '../../../../shared/avatar/avatar.component';
import { EditDialogOverviewComponent } from './edit-dialog';
import { MaterialModule } from '../../../../material.module';

describe('TeacherListComponent', () => {
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
      ]
    });
  });

  it('should create edit dialog', () => {
    const fixture = TestBed.createComponent(EditDialogOverviewComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
