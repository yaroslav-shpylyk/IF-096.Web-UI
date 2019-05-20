import { TestBed } from '@angular/core/testing';

import { TeachersJournalService } from './teachers-journal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeachersJournalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TeachersJournalService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TeachersJournalService = TestBed.get(TeachersJournalService);
    expect(service).toBeTruthy();
  });
});
