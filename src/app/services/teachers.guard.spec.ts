import { TestBed, async, inject } from '@angular/core/testing';

import { TeachersGuard } from './teachers.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TeachersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeachersGuard],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should ...', inject([TeachersGuard], (guard: TeachersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
