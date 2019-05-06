import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
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

  it('check user role for being admin', () => {
    let authService = TestBed.get(AuthService);
    let footerComponent = new FooterComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_ADMIN');
    expect(footerComponent.isAdmin()).toBeTruthy();
  });

  it('check user role for being teacher', () => {
    let authService = TestBed.get(AuthService);
    let footerComponent = new FooterComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_TEACHER');
    expect(footerComponent.isTeacher()).toBeTruthy();
  });

  it('check user role for being student', () => {
    let authService = TestBed.get(AuthService);
    let footerComponent = new FooterComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_USER');
    expect(footerComponent.isStudent()).toBeTruthy();
  });
});
