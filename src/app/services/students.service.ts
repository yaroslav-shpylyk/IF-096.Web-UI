import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClassData} from '../models/class-data';
import { ClassService } from './class.service';
import { StudentsOfStream } from '../models/students-of-stream';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient, private classService: ClassService) { }

 /**
  * Method returns data with students from backend,where id is class
  */

  getStudents(id): Observable<any> {
    return this.http.get(`/students/classes/${id}`).
      pipe(map((res: any) => res.data));
  }

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

  /**
   * Method return data with students by number of classes stream
   * @param stream - Number of stream
   * @returns - Array with objects of class name and number of students in it
   */
  public getStudentsByStream(stream: number): Observable<any> {
    return this.classService.getClasses('active')
      .pipe(
        map((result: ClassData[]) => {
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
