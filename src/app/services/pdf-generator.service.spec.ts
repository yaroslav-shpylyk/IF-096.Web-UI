import { TestBed } from '@angular/core/testing';

import { PdfGeneratorService } from './pdf-generator.service';

describe('PdfGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfGeneratorService = TestBed.get(PdfGeneratorService);
    expect(service).toBeTruthy();
  });
});
