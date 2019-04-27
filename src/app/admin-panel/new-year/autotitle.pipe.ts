import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autotitle'
})
export class TitlePipe implements PipeTransform {

  transform(value: any, curClassName: string): string {
    const curClassNumber = +curClassName.split('-')[0];
    if (value === '' && curClassNumber === 11 ) {
      return 'випуск';
    } else if (value === '') {
      return 'розформ.';
    } else {
      return value;
    }
  }
}
