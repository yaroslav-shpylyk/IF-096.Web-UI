import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'autotitle'
})
export class TitlePipe implements PipeTransform {

  transform(value: any, curClassName: string): string {
    const classNameParts = curClassName.split(/[-(]/);
    const curClassNumber = (classNameParts.length > 2) ? +classNameParts[1] : +classNameParts[0];
    if (value === '' && curClassNumber === 11 ) {
      return 'випуск';
    } else if (value === '') {
      return 'розформ.';
    } else {
      return value;
    }
  }
}
