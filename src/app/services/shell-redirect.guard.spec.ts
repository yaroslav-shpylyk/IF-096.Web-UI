import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShellRedirectGuard } from './shell-redirect.guard';

describe('Guard for Shell component which should redirect', () => {
  let shellRedirectGuard: ShellRedirectGuard;
  const routerSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        ShellRedirectGuard,
        { provide: RouterStateSnapshot, useValue: routerSnapshot }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    shellRedirectGuard = TestBed.get(ShellRedirectGuard);
  });
  it('canActivate should always return false', () => {
    expect(shellRedirectGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot)).toBe(false);
  });
});
