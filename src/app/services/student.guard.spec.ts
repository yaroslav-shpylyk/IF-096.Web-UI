import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentGuard } from './student.guard';

describe('Guard for student', () => {
  let studentGuard: StudentGuard;
  let router: RouterTestingModule;
  const routerSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [StudentGuard,
        {provide: RouterStateSnapshot, useValue: routerSnapshot}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    studentGuard = TestBed.get(StudentGuard);
    router = TestBed.get(RouterTestingModule);
  });

  it('canActivate should allow access', () => {
    spyOn(studentGuard, 'isStudent').and.returnValue(true);
    expect(studentGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot)).toBe(true);
  });
  it('canActivate should deny access', () => {
    spyOn(studentGuard, 'isStudent').and.returnValue(false);
    expect(studentGuard.canActivate(new ActivatedRouteSnapshot(), routerSnapshot)).toBe(false);
  });
  it('canLoad should allow access', () => {
    spyOn(studentGuard, 'isStudent').and.returnValue(true);
    expect(studentGuard.canLoad(router)).toBe(true);
  });
  it('canLoad should deny access', () => {
    spyOn(studentGuard, 'isStudent').and.returnValue(false);
    expect(studentGuard.canLoad(router)).toBe(false);
  });
});
