import { TestBed } from '@angular/core/testing';

import { NewYearService } from './new-year.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewYearService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [NewYearService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: NewYearService = TestBed.get(NewYearService);
    expect(service).toBeTruthy();
  });
});
