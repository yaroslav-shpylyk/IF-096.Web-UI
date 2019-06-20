import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShellRedirectGuard } from './shell-redirect.guard';
import { AuthService } from './auth.service';

describe('Guard for Shell component which should redirect', () => {
  let shellRedirectGuard: ShellRedirectGuard;
  let authService: AuthService;
  const routerSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
  const router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        ShellRedirectGuard,
        AuthService,
        { provide: Router, useValue: router },
        { provide: RouterStateSnapshot, useValue: routerSnapshot }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    shellRedirectGuard = TestBed.get(ShellRedirectGuard);
    authService = TestBed.get(AuthService);
  });
  it('canActivate should always return false', () => {
    expect(shellRedirectGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot)).toBe(false);
  });
  it('canActivate should redirect to /admin-panel/ if user is admin', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_ADMIN');
    shellRedirectGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot);
    expect(router.navigate).toHaveBeenCalledWith(['/admin-panel/']);
  });
  it('canActivate should redirect to /journals/my-journals if user is teacher', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_TEACHER');
    shellRedirectGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot);
    expect(router.navigate).toHaveBeenCalledWith(['journals', 'my-journals']);
  });
  it('canActivate should redirect to /student-book/ if user is student', () => {
    spyOn(authService, 'getUserRole').and.returnValue('ROLE_USER');
    shellRedirectGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot);
    expect(router.navigate).toHaveBeenCalledWith(['/student-book/']);
  });
});
