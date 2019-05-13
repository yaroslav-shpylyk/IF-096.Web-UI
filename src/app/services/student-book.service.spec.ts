import { async, TestBed } from '@angular/core/testing';
import { StudentBookService } from './student-book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StudentBookService', () => {
  let httpTestingController: HttpTestingController;
  let studentService: StudentBookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentBookService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    studentService = TestBed.get(StudentBookService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('service should be defined', async(() => {
    expect(studentService).toBeDefined();
  }));
});
