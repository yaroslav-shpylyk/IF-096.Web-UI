import {async, TestBed} from '@angular/core/testing';

import { StudentBookService } from './student-book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentBookData } from '../models/student-book-data';
import { pipe } from 'rxjs';


fdescribe('StudentBookService', () => {
  let studentService: StudentBookService;
  let studentBookData: StudentBookData[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ StudentBookService ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    studentService = TestBed.get(StudentBookService);
  });

  // beforeEach(inject([TeachersStorageService], service => {
  //   teacherService = service;
  // }));

  fit('service should be defined', async(() => {
    expect(studentService).toBeDefined();
  }));

  // fit('should get teacher data from service', async(() => {
  //   studentService.inputDate = '2019-05-13';
  //   studentService.getStudentBook().subscribe(data => {
  //     studentBookData = data;
  //   });
  //   expect(studentBookData[0].lessonId).toBeDefined();
  // }));
});
