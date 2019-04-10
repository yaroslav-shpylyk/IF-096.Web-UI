import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { TeacherService } from "./teacher.service";

describe('TeacherService', () => {
=======
import { TeacherService } from './teacher.service';

describe('TeachersService', () => {
>>>>>>> master
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherService = TestBed.get(TeacherService);
    expect(service).toBeTruthy();
  });
});
