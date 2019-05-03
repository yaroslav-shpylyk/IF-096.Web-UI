import { TestBed } from '@angular/core/testing';

import { StudentBookService } from './student-book.service';

describe('StudentBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentBookService = TestBed.get(StudentBookService);
    expect(service).toBeTruthy();
  });
});
