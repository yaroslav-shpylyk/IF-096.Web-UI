import { TestBed } from '@angular/core/testing';

import { ClassService } from './class.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClassService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ClassService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ClassService = TestBed.get(ClassService);
    expect(service).toBeTruthy();
  });
});
