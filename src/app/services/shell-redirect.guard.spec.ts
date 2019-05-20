import { TestBed, async, inject } from '@angular/core/testing';

import { ShellRedirectGuard } from './shell-redirect.guard';

describe('ShellRedirectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShellRedirectGuard]
    });
  });

  it('should ...', inject([ShellRedirectGuard], (guard: ShellRedirectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
