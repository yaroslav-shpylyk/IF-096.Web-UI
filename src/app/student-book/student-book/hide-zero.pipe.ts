import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hideZero'
})
export class HideZeroPipe implements PipeTransform {
  transform(value: any) {
    if (value === 0) {
      return null;
    }
    return value;
  }
}
