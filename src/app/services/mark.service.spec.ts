import { TestBed } from '@angular/core/testing';

import { MarkService } from './mark.service';

describe('MarkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkService = TestBed.get(MarkService);
    expect(service).toBeTruthy();
  });
});
