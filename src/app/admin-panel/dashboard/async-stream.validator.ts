import { AbstractControl } from '@angular/forms';
import { ClassService } from '../../services/class.service';
import { map } from 'rxjs/operators';
import { ClassesFromStream } from '../../models/classes-from-stream';

export class AsyncStreamValidator {
  static createValidator(classService: ClassService) {
    return (control: AbstractControl) => {
      return classService.getClassesByStream(control.value)
        .pipe(
          map((result: ClassesFromStream) => result.studentsData.length ? null : { noClasses: true })
        );
    };
  }
}
