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
    const existError = allClasses.some(
       (item) => {
        return (item.classYear === classYear + 1 && item.className === control.value); }
    );
    if (existError) {
      return { class_exist: {valid: false} };
    }

    if (control.value !== '') {
      const curClassNameParts = curClassTitle.split(/[-(]/);
      const newNameParts = control.value.split(/[-(]/);
      if (newNameParts.length !== curClassNameParts.length) {
        if (newNameParts.length <= curClassNameParts.length ) {
          if (+newNameParts[0] <= +curClassNameParts[1]) { return {error_number: {valid: false}}; }
        } else {
            if (+newNameParts[1] < +curClassNameParts[0]) { return {error_number: {valid: false}}; }
          }
        } else {
        if (curClassNameParts.some(
          (item, index)  => {
          return +item >= +newNameParts[index] && index < newNameParts.length - 1; })) {
          return {error_number: {valid: false} };
        }
      }
    }
    return null;
  };
}
