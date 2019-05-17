import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherConnectionComponent } from './teacher-connection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import {MatStepperModule} from '@angular/material/stepper';
import { AdminHeaderMenuComponent } from '../admin-panel/header-menu/header-menu.component';
import { StudentHeaderMenuComponent } from '../../student-book/header-menu/header-menu.component';
import { TeacherHeaderMenuComponent } from '../../journal/header-menu/header-menu.component';
import { AdminFooterMenuComponent } from '../admin-panel/footer-menu/footer-menu.component';
import { StudentFooterMenuComponent } from '../../student-book/footer-menu/footer-menu.component';
import { TeacherFooterMenuComponent } from '../../journal/footer-menu/footer-menu.component';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TeacherConnectionComponent', () => {
  let component: TeacherConnectionComponent;
  let fixture: ComponentFixture<TeacherConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, ReactiveFormsModule,
        MatStepperModule, RouterModule, RouterTestingModule ],
      declarations: [ TeacherConnectionComponent, HeaderComponent, FooterComponent,
         AdminHeaderMenuComponent, StudentHeaderMenuComponent, TeacherHeaderMenuComponent,
         AdminFooterMenuComponent, StudentFooterMenuComponent, TeacherFooterMenuComponent,
         AvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
