import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TeachersService {
  constructor() {}

  teachersChanged = new Subject();
  teacherChanged = new Subject();

  private teachers = [];
  private teacher;

  setTeachers(teachers) {
    this.teachers = teachers;
    this.teachersChanged.next(this.teachers.slice());
  }

  getTeachers() {
    return this.teachers.slice()
  }

  setTeacher(teacher) {
    this.teacher = teacher;
    this.teacherChanged.next(this.teacher);
  }
}
