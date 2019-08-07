import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkTypesService } from './mark-types.service';

describe('MarkTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: MarkTypesService = TestBed.get(MarkTypesService);
    expect(service).toBeTruthy();
  });
});
