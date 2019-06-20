import { AbstractControl } from '@angular/forms';
import { ClassService } from '../../../services/class.service';
import { map } from 'rxjs/operators';
import { ClassesFromStream } from '../../../models/classes-from-stream';

export function AsyncStreamValidator(classService: ClassService) {
  return (control: AbstractControl) => {
    return classService.getClassesByStream(control.value)
      .pipe(
        map((result: ClassesFromStream) => result.allStudents ? null : { noClasses: true })
      );
  };
}
