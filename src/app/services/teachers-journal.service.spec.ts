import { TestBed } from '@angular/core/testing';

import { TeachersJournalService } from './teachers-journal.service';

describe('TeachersJournalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeachersJournalService = TestBed.get(TeachersJournalService);
    expect(service).toBeTruthy();
  });
});
