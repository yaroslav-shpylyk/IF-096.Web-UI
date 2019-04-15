import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (
        item[propName].includes(
          filterString.charAt(0).toUpperCase() + filterString.slice(1),
          0
        )
      ) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
