import { Pipe, PipeTransform } from '@angular/core';
import { ClassInfo } from '../../models/class-info';
@Pipe({
  name: 'classFilter'
})
export class ClassFilterPipe implements PipeTransform {

  transform( value: number[], Active: boolean, NotEmpty: boolean, curYear: boolean,
             allClasses: ClassInfo[], titleInput: any, skipCheckbox: any ): any {
    const curDate = new Date();
    const year = (curDate.getMonth() < 12 && curDate.getMonth() > 7) ? curDate.getFullYear() : curDate.getFullYear() - 1;
    const filterParams = [];
    const isActive = (item) => allClasses[item].isActive;
    const isCurrentYear = (item) => allClasses[item].classYear === year;
    const isNotEmpty = (item) => allClasses[item].numOfStudents > 0;

    if (Active) {
      filterParams.push(isActive);
    }
    if (NotEmpty) {
      filterParams.push(isNotEmpty);
    }
    if (curYear) {
      filterParams.push(isCurrentYear);
    }

    const res = value.filter(
      (item, index) => {
        skipCheckbox[index].value = false;
        if ( filterParams.every(func => func(item))) {
          titleInput[index].reset({ value: titleInput[index].value, disabled: false });
          return true;
        } else {
          titleInput[index].reset({ value: titleInput[index].value, disabled: true });
        }
      }
    );
    if (res.length === 0) {
      res.push(-1);
    }
    return res;
  }
}
