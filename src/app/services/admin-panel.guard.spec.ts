import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminPanelGuard } from './admin-panel.guard';

describe('Guard for admin panel', () => {
  let adminGuard: AdminPanelGuard;
  let routerSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AdminPanelGuard,
        { provide: RouterStateSnapshot, useValue: routerSnapshot }
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    adminGuard = TestBed.get(AdminPanelGuard);
  });
  it('canActivate should allow access', () => {
    spyOn(adminGuard, 'isAdmin').and.returnValue(true);
    expect(adminGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot)).toBe(true);
  });
  it('canActivate should deny access', () => {
    spyOn(adminGuard, 'isAdmin').and.returnValue(false);
    expect(adminGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot)).toBe(false);
  });
  it('canLoad should allow access', () => {
    spyOn(adminGuard, 'isAdmin').and.returnValue(true);
    expect(adminGuard.canLoad()).toBe(true);
  });
  it('canLoad should deny access', () => {
    spyOn(adminGuard, 'isAdmin').and.returnValue(false);
    expect(adminGuard.canLoad()).toBe(false);
  });
});
