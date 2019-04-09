import { TestBed, async, inject } from '@angular/core/testing';

import { TeachersGuard } from './teachers.guard';

describe('TeachersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeachersGuard]
    });
  });

  it('should ...', inject([TeachersGuard], (guard: TeachersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
