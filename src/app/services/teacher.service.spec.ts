import { TestBed } from '@angular/core/testing';

import { TeacherService } from './teacher.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeachersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TeacherService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TeacherService = TestBed.get(TeacherService);
    expect(service).toBeTruthy();
  });
});
