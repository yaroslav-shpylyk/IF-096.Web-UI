import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'autotitle'
})
export class TitlePipe implements PipeTransform {

  transform(value: any, curClassName: string, input: FormControl): string {
    setTimeout(() => {
      input.reset({ value: input.value, disabled: false });
    });
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
