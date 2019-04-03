import { TestBed, async, inject } from '@angular/core/testing';

import { ShellGuard } from './shell.guard';

describe('ShellGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShellGuard]
    });
  });

  it('should ...', inject([ShellGuard], (guard: ShellGuard) => {
    expect(guard).toBeTruthy();
  }));
});
