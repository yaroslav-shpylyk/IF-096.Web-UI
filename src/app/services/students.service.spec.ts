import { TestBed } from '@angular/core/testing';

import { StudentsService } from './students.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [StudentsService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: StudentsService = TestBed.get(StudentsService);
    expect(service).toBeTruthy();
  });
});
