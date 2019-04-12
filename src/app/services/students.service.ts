import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { Subject, BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
        // this.sub.next(res.data);
        return res.data;
      }));
  }

  /*
    * Method return student data, where id is student id
  */
  getOneStudent(id): Observable<Student> {
    return this.http.get(`/students/${id}`).
      pipe(map((res: { status: any, data: Student }) => res.data));
  }

  addStudents(data): Observable<any> {
    return this.http.post(`/students`, data, { observe: 'response' }).
      pipe(map(formdata => console.log('inservise', formdata)));
  }

  changeStudent(id, formdata): Observable<any> {
    return this.http.put(`/admin/students/${id}`, formdata, { observe: 'response' }).
      pipe(map(data => console.log('inservise', data)));
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




