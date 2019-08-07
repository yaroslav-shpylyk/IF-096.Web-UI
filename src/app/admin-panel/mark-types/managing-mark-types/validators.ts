import { AbstractControl } from '@angular/forms';
import { MarkType } from '../../../models/mark-type';

/**
 * Title validation for new type of marks
 * @param allMarkTypes - array of objects with data about marks
 * @param initTitle - the title with which the control was initialized
 * @returns - return FormControl with validation error or null
 */
export function MarkTypesValidator(allMarkTypes: MarkType[], initTitle: string) {
  return (control: AbstractControl) => {
    const isMarkAllreadyPresent = item => item.markType === control.value;

    // return null if controls haven't initialised yet
    if (!control) { return null;  }
    // return null if another validator has already found an error on the matchingControl
    if (control.errors && !control.errors.duplicate) { return null; }

    if (allMarkTypes.some(isMarkAllreadyPresent) && control.value !== initTitle) {
      return { dublicate: {valid: false} };
    }
    return null;
  };
}
