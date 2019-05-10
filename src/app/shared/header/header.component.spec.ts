import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from './header.component';
import { StudentHeaderMenuComponent } from '../../student-book/header-menu/header-menu.component';
import { TeacherHeaderMenuComponent } from '../../journal/header-menu/header-menu.component';
import { AdminHeaderMenuComponent } from '../../admin-panel/admin-panel/header-menu/header-menu.component';
import { MatToolbarModule, MatIconModule, MatMenuModule, MatListModule, MatDividerModule } from '@angular/material';
import { AvatarComponent } from '../avatar/avatar.component';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService
      ],
      declarations: [
        HeaderComponent,
        AdminHeaderMenuComponent,
        TeacherHeaderMenuComponent,
        StudentHeaderMenuComponent,
        AvatarComponent
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    authService = TestBed.get(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('should return true if user is admin', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_ADMIN');
    expect(component.isAdmin()).toBe(true);
  });
  fit('should return true if user is teacher', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_TEACHER');
    expect(component.isTeacher()).toBe(true);
  });
  fit('should return true if user is student', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_USER');
    expect(component.isStudent()).toBe(true);
  });
});
