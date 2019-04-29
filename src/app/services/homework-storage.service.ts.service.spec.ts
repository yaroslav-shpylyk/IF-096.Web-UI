import { TestBed } from '@angular/core/testing';

import { HomeworkStorageService } from './homework-storage.service.ts.service';

describe('HomeworkStorage.Service.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeworkStorageService = TestBed.get(HomeworkStorageService);
    expect(service).toBeTruthy();
  });
});
