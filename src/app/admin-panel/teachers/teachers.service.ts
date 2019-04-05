import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TeachersService {
  constructor() {}

  teachersChanged = new Subject();
  teacherChanged = new Subject();

  private teachers = [];
  private teacher;
  public modalsId;

  /**
   * Method gets array of up to date objects with teachers,
   * saves them to the local variable and passes a copy to observable
   * @param teachers - array of objects representing teacher.
   */
  setTeachers(teachers) {
    this.teachers = teachers;
    this.teachersChanged.next(this.teachers.slice());
  }

  /**
   * Method returns array of objects with teachers storode in local variable
   * @returns - array of objects representing teacher
   */
  getTeachers() {
    return this.teachers.slice();
  }

  /**
   * Method gets an object of teacher, saves it to the
   * local variable and passes a copy to observable
   * @param teacher - object representing a single teacher.
   */
  setTeacher(teacher) {
    this.teacher = teacher;
    this.teacherChanged.next(this.teacher);
  }
}
