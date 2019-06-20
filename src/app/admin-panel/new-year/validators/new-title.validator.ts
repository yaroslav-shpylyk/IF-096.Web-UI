import { AbstractControl } from '@angular/forms';
import { ClassData } from '../../../models/class-data';

/**
 * Title validation for new class
 * @param allClasses ClassData[] - Array of objects with data about classes
 * @param classYear number - current class year
 * @param curClassTitle string - current class title
 * @returns - return FormControl with validation error or null
 */
export function NewTitleValidator(allClasses: ClassData[], classYear: number, curClassTitle: string) {
  return (control: AbstractControl) => {
    if (curClassTitle === control.value) {
      return {title_dublicate: {valid: false}};
    }

    const isClassAllreadyPresent = item => item.classYear === classYear + 1 && item.className === control.value;
    if (allClasses.some(isClassAllreadyPresent)) {
      return { class_exist: {valid: false} };
    }

    if (control.value !== '') {
      const partsOfCurTitle = curClassTitle.split(/[-(]/);
      const partsOfNewTitle = control.value.split(/[-(]/);
      const isSameTitleTypes = () => partsOfNewTitle.length === partsOfCurTitle.length; // oldTitleType: 5-A; newTitleType: 1(5-А)
      const isOldTitleType = () => partsOfNewTitle.length <= partsOfCurTitle.length;

      const isFirstNumInNewTitleLess = () => {
        if (isOldTitleType()) {
          return +partsOfNewTitle[0] <= +partsOfCurTitle[1];
        } else {return +partsOfNewTitle[1] < +partsOfCurTitle[0]; }
      };

      const isSomeNumInNewTitleLess = () => partsOfCurTitle.some(
        (item, index)  =>  +item >= +partsOfNewTitle[index] && index < partsOfNewTitle.length - 1
      );

      if (!isSameTitleTypes()) {
        if ( isFirstNumInNewTitleLess() ) { return {error_number: {valid: false} }; }
      } else if (isSomeNumInNewTitleLess()) {
        return { error_number: {valid: false} };
      }
    }
    return null;
  };
}
