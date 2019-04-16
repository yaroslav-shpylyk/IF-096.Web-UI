import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autotitle'
})
export class TitlePipe implements PipeTransform {

  transform(value: any, curTitle: string, input: any): any {
    const classNameData = curTitle.split('-');
    const newTitle = (+classNameData[0] + 1 > 11) ? '' : (+classNameData[0] + 1) + '-' + classNameData[1];
    setTimeout(() => {
      input.reset({ value: newTitle, disabled: false });
    });
    return value;
  }
}
