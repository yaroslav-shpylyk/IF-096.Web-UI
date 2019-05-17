import { TestBed, async, inject } from '@angular/core/testing';

import { ShellGuard } from './shell.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShellGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShellGuard],
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
  });

  it('should ...', inject([ShellGuard], (guard: ShellGuard) => {
    expect(guard).toBeTruthy();
  }));
});
