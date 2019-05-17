import { TestBed, async } from '@angular/core/testing';
import { SubjectService } from './subject.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SubjectsService', () => {
  let httpTestingController: HttpTestingController;
  let subjectService: SubjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ SubjectService ]
    })
     .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    subjectService = TestBed.get(SubjectService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('service should be defined', async(() => {
    expect(subjectService).toBeDefined();
  }));
});
