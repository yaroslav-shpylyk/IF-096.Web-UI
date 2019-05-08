import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from './header.component';

fdescribe('HeaderComponent', () => {
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
  fit('should return false for hide in showHeader() method', fakeAsync(() => {
    const authService = TestBed.get(AuthService);
    const headerComponent = new HeaderComponent(authService);
    spyOn(headerComponent, 'showHeader');
    tick();
    expect(headerComponent.hide).toBeFalsy();
  }));

  fit('should return false for notransition in showHeader() method', fakeAsync(() => {
    const authService = TestBed.get(AuthService);
    const headerComponent = new HeaderComponent(authService);
    spyOn(headerComponent, 'showHeader');
    tick();
    expect(headerComponent.notransition).toBeFalsy();
  }));

  fit('should return true if user is admin', () => {
    const authService = TestBed.get(AuthService);
    const headerComponent = new HeaderComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_ADMIN');
    expect(headerComponent.isAdmin()).toBeTruthy();
  });

  fit('should return true if user is teacher', () => {
    const authService = TestBed.get(AuthService);
    const headerComponent = new HeaderComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_TEACHER');
    expect(headerComponent.isTeacher()).toBeTruthy();
  });

  fit('should return true if user is student', () => {
    const authService = TestBed.get(AuthService);
    const headerComponent = new HeaderComponent(authService);
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_USER');
    expect(headerComponent.isStudent()).toBeTruthy();
  });
});
