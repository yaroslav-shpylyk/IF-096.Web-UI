import { TestBed } from '@angular/core/testing';

import { MarkTypesService } from './mark-types.service';

describe('MarkTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkTypesService = TestBed.get(MarkTypesService);
    expect(service).toBeTruthy();
  });
});
