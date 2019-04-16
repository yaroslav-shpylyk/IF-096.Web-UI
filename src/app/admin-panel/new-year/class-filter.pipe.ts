import { Pipe, PipeTransform } from '@angular/core';
import { ClassInfo } from '../../models/class-info';
@Pipe({
  name: 'classFilter'
})
export class ClassFilterPipe implements PipeTransform {

  transform( value: number[], Active: boolean, NotEmpty: boolean, curYear: boolean, allClasses: ClassInfo[]): any {
    const curDate = new Date();
    const year = (curDate.getMonth() < 12 && curDate.getMonth() > 7) ? curDate.getFullYear() : curDate.getFullYear() - 1;
    const filterParams = [];
    const isActive = (item) => allClasses[item].isActive;
    const isCurrentYear = (item) => allClasses[item].classYear === year;
    const isNotEmpty = (item) => allClasses[item].numOfStudents > 0;
    const isEvery = predicates => func => predicates.every(predicate => predicate(func));

    if (Active) {
      filterParams.push(isActive);
    }
    if (NotEmpty) {
      filterParams.push(isNotEmpty);
    }
    if (curYear) {
      filterParams.push(isCurrentYear);
    }

    const res = value.filter(isEvery(filterParams));
    if (res.length === 0) {
      res.push(-1);
    }
    return res;
  }
}