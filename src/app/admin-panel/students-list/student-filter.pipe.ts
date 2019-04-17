import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../models/student';

@Pipe({
  name: 'studentFilter',
  pure: false
})
export class StudentFilterPipe implements PipeTransform {

  transform(student: Array<Student>, search: string): any {

    if (!student || !search) {
      return student;
    }

    // filter student array

    return student.filter((item: Student) => {

      if (item.firstname.toLowerCase().startsWith(search.toLowerCase())
        || item.firstname.toLowerCase().includes(search.toLowerCase())
        || item.lastname.toLowerCase().startsWith(search.toLowerCase())
        || item.lastname.toLowerCase().includes(search.toLowerCase())
        || item.patronymic.toLowerCase().startsWith(search.toLowerCase())
        || item.patronymic.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });
  }
}


