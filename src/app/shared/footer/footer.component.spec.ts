import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from './footer.component';
import { MatToolbarModule, MatListModule, MatIconModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { AdminFooterMenuComponent } from '../../admin-panel/admin-panel/footer-menu/footer-menu.component';
import { TeacherFooterMenuComponent } from '../../journal/footer-menu/footer-menu.component';
import { StudentFooterMenuComponent } from '../../student-book/footer-menu/footer-menu.component';
import { AvatarComponent } from '../avatar/avatar.component';

fdescribe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let authService: AuthService;
  beforeEach(() => {
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
      providers: [ AuthService ],
      declarations: [ 
        FooterComponent,
        AdminFooterMenuComponent,
        TeacherFooterMenuComponent,
        StudentFooterMenuComponent,
        AvatarComponent
       ]
    }) .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    authService = TestBed.get(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('should return true if user is admin', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_ADMIN');
    expect(component.isAdmin()).toBeTruthy();
  });

  fit('should return true if user is teacher', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_TEACHER');
    expect(component.isTeacher()).toBeTruthy();
  });

  fit('should return true if user is student', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_USER');
    expect(component.isStudent()).toBeTruthy();
  });
});
