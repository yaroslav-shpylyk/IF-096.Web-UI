import { TestBed } from '@angular/core/testing';

import { ClassListService } from './class-list.service';

describe('ClassListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassListService = TestBed.get(ClassListService);
    expect(service).toBeTruthy();
  });
});
