import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { ClassData} from '../models/class-data';
import { ClassService } from './class.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient, private classService: ClassService) { }

  /**
   * Method return data with students, that are in this class, where id is class id
   */
  getStudents(id): Observable<Student[]> {
    return this.http.get(`/students/classes/${id}`).
      pipe(map((res: { status: any, data: Student[] }) => res.data));
  }

  /**
   * Method return student data, where id is student id
   */
  getOneStudent(id): Observable<Student> {
    return this.http.get(`/students/${id}`).
      pipe(map((res: { status: any, data: Student }) => res.data));
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
}

