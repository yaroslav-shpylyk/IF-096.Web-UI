import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TeachersService {
  constructor() {}

  teachersChanged = new Subject();

  private teachers = [];

  setTeachers(teachers) {
    this.teachers = teachers.data;
    for (let teacher of this.teachers) {
      if (!teacher['avatar']) {
        teacher.avatar = 'https://png.pngtree.com/svg/20161212/f93e57629c.svg'
      }
    }
    this.teachersChanged.next(this.teachers.slice());
    console.log(this.teachers)
  }

  getTeachers() {
    console.log(this.teachers)
    return this.teachers.slice()
  }
}
