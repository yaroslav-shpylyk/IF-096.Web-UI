import { TestBed } from '@angular/core/testing';

import { SubjectService } from './subject.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SubjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [SubjectService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SubjectService = TestBed.get(SubjectService);
    expect(service).toBeTruthy();
  });
});
