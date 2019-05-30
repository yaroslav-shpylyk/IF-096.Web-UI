import { TestBed } from '@angular/core/testing';

import { MarkService } from './mark.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MarkService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [MarkService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MarkService = TestBed.get(MarkService);
    expect(service).toBeTruthy();
  });
});
