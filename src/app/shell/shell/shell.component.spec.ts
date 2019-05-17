import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { MatStepperModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TeacherConnectionComponent } from '../../admin-panel/teacher-connection/teacher-connection.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AdminHeaderMenuComponent } from '../../admin-panel/admin-panel/header-menu/header-menu.component';
import { StudentHeaderMenuComponent } from '../../student-book/header-menu/header-menu.component';
import { TeacherHeaderMenuComponent } from '../../journal/header-menu/header-menu.component';
import { AdminFooterMenuComponent } from '../../admin-panel/admin-panel/footer-menu/footer-menu.component';
import { StudentFooterMenuComponent } from '../../student-book/footer-menu/footer-menu.component';
import { TeacherFooterMenuComponent } from '../../journal/footer-menu/footer-menu.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, ReactiveFormsModule,
        MatStepperModule, RouterModule, RouterTestingModule ],
      declarations: [ ShellComponent, HeaderComponent, FooterComponent,
         AdminHeaderMenuComponent, StudentHeaderMenuComponent, TeacherHeaderMenuComponent,
         AdminFooterMenuComponent, StudentFooterMenuComponent, TeacherFooterMenuComponent,
         AvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
