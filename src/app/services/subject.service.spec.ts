import { TestBed } from '@angular/core/testing';

import { SubjectService } from './subject.service';

describe('SubjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectService = TestBed.get(SubjectService);
    expect(service).toBeTruthy();
  });
});
