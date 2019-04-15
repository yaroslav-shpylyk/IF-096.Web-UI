import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Student } from '../models/student';
import { ClassData } from '../models/class-data';
import { ClassService } from './class.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient, private classService: ClassService) { }

  private sub = new Subject<Student[]>();

  getSubject(): Subject<Student[]> {
    return this.sub;
  }

  /**
   * Method give next value for Subject
   */

  loadStudents(id) {
    this.http.get(`/students/classes/${id}`)
      .forEach((res: { status: any, data: Student[] }) => {
        this.sub.next(res.data);
      });
  }

  /**
   * Method return data with students, that are in this class, where id is class id
   */

  getStudents(id): Observable<Student[]> {
    return this.http.get(`/students/classes/${id}`).
      pipe(map((res: { status: any, data: Student[] }) => {
        return res.data;
      }));
  }

  /**
   * Method return student data, where id is student id
   */

  getOneStudent(id): Observable<Student> {
    return this.http.get(`/students/${id}`).
      pipe(map((res: { status: any, data: Student }) => res.data));
  }

  /**
   * Method add student data on backend
   */

  addStudents(data): Observable<any> {
    return this.http.post(`/students`, data, { observe: 'response' }).
      pipe(map(formdata => console.log('Student added', formdata)));
  }

  /**
   * Method change student data on backend
   */

  changeStudent(id, formdata): Observable<any> {
    return this.http.put(`/admin/students/${id}`, formdata, { observe: 'response' }).
      pipe(map(data => console.log('Student changed', data)));
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




