import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autotitle'
})
export class TitlePipe implements PipeTransform {

  transform(value: any, curTitle: string, input?: any, active?: boolean): any {
    console.log('autotitle');
    active = false;
    const classNameData = curTitle.split('-');
    const newTitle = (+classNameData[0] + 1 > 11) ? '' : (+classNameData[0] + 1) + '-' + classNameData[1];
    setTimeout(() => {
      if (!active) {
        input.reset({ value: newTitle, disabled: false });
      } else {
        input.reset({ value: 'нова назва класу', disabled: false });
      }
    });
    return value;
  }
}
