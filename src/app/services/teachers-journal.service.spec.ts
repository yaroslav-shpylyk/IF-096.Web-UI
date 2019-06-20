import { TestBed, inject, async } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeachersJournalService } from './teachers-journal.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockTeachersJournalPost = {
  class: {},
  subject: {},
  teacher: {}
};

const mockPost = {
  class: {},
  subject: {},
  teacher: {}
};

describe('TeachersJournalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
      providers: [TeachersJournalService]
  });
});


  it('should be initialized', inject([TeachersJournalService], (teacherjournalServise: TeachersJournalService) => {
    expect(teacherjournalServise).toBeTruthy();
  }));

  xit('should return the teacher, subject, class', inject(
    [TeachersJournalService, HttpTestingController],
    (service: TeachersJournalService, backend: HttpTestingController) => {
      service.sentDataToJournal(mockTeachersJournalPost, 121, 16, 42).subscribe(journal => {
        expect(journal).toEqual(mockPost);
      });
      backend
        .expectOne({
          method: 'POST',
          url: '/teachers/${teacherId}/classes/${classId}/subjects/${subjectId}/journal'
        })
        .flush({ data: mockPost });
    }
  ));
});
