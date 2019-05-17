import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { of } from 'rxjs';

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

  
});
