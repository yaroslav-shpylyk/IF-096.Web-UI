import { Injectable } from '@angular/core';
import { ClassService } from './class.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ClassData } from '../models/class-data';
import { StudentsOfStream } from '../models/students-of-stream';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private classService: ClassService) { }

  /**
   * Method returns students
   * @returns - Number of students
   */
  public getNumberOfStudents(type: string): Observable<number> {
    return this.classService.getClasses(type)
      .pipe(
        map((result: ClassData[]) => {
          return result.reduce((students, currClass) => students + currClass.numOfStudents, 0);
        })
      );
  }
  public getStudentsByStream(stream: number): any {
    return this.classService.getClasses('active')
      .pipe(
        map(result => {
          const uniqueClasses: ClassData[] = [];
          result
            .filter(item => item.isActive && parseInt(item.className, 10) === stream && item.numOfStudents)
            .forEach(item => {
              if (!uniqueClasses.some(value => item.className === value.className)) {
                uniqueClasses.push(item);
              }
            });
          const studentsStream: StudentsOfStream[] = uniqueClasses.map(item => {
            return {
              className: item.className,
              numOfStudents: item.numOfStudents
            };
          });
          return {
            studentsData: studentsStream,
            allStudents: studentsStream.reduce((sum, studentClass) => sum + studentClass.numOfStudents , 0)
          };
        }),
        tap(result => console.log(result))
      );
  }
}
