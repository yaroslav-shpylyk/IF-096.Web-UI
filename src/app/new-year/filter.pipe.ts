import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(value: any, Active: boolean, NotEmpty: boolean, curYear: boolean, allClasses: any ): any {
    const isActive = (item) => allClasses[item].isActive;
    const curDate = new Date();
    const year = (curDate.getMonth() < 12 && curDate.getMonth() > 7) ? curDate.getFullYear() : curDate.getFullYear() - 1;
    const isCurrentYear = (item) => allClasses[item].classYear === year;
    const isNotEmpty = (item) => allClasses[item].numOfStudents > 0;
    const isEvery = predicates => func => predicates.every(predicate => predicate(func));

    const filterParams = [];
    if (Active) {filterParams.push(isActive); }
    if (NotEmpty) {filterParams.push(isNotEmpty); }
    if (curYear) {filterParams.push(isCurrentYear); }

    if (value.length === 0) {
      return value;
    }

    const res = value
      .filter(isEvery(filterParams));
    return res;

  }
}
