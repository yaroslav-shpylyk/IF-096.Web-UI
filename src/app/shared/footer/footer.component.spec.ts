import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from './footer.component';

fdescribe('FooterComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthService
      ]
    });
  });
  fit('should return true if user is admin', () => {
    const authService = TestBed.get(AuthService);
    const footerComponent = new FooterComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_ADMIN');
    expect(footerComponent.isAdmin()).toBeTruthy();
  });

  fit('should return true if user is teacher', () => {
    const authService = TestBed.get(AuthService);
    const footerComponent = new FooterComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_TEACHER');
    expect(footerComponent.isTeacher()).toBeTruthy();
  });

  fit('should return true if user is student', () => {
    const authService = TestBed.get(AuthService);
    const footerComponent = new FooterComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_USER');
    expect(footerComponent.isStudent()).toBeTruthy();
  });
});
