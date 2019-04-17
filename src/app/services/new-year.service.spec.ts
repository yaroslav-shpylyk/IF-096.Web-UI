import { TestBed } from '@angular/core/testing';

import { NewYearService } from './new-year.service';

describe('NewYearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewYearService = TestBed.get(NewYearService);
    expect(service).toBeTruthy();
  });
});
