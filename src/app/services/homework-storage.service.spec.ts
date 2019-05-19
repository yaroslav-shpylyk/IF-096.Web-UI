import { TestBed } from '@angular/core/testing';

import { HomeworkStorageService } from './homework-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeworkStorage.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [HomeworkStorageService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: HomeworkStorageService = TestBed.get(HomeworkStorageService);
    expect(service).toBeTruthy();
  });
});
