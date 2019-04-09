import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(value: any, Active: boolean, NotEmpty: boolean, curYear: boolean ): any {
    const isActive = (item) => item.isActive;
    const isCurrentYear = (item) => item.classYear === 2019; // ***hardcode
    const isNotEmpty = (item) => item.numOfStudents > 0;
    const isEvery = predicates => func => predicates.every(predicate => predicate(func));

    const filterParams = [];
    if (Active) {filterParams.push(isActive); }
    if (NotEmpty) {filterParams.push(isNotEmpty); }
    if (curYear) {filterParams.push(isCurrentYear); }

    if (value.length === 0) {
      return value;
    }

    const res = value.filter(isEvery(filterParams));
    return res;

  }
}
