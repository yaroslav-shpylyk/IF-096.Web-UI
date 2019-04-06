import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Student } from '../models/student';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  /**
    * Method returns data with students from backend,where id is class
    */

  getStudents(id): Observable<Student[]> {
    return this.http.get(`/students/classes/${id}`).
      pipe(map((res: { status: any, data: Student[] }) => res.data))
  }

  getOneStudent(id): Observable<Student> {
    return this.http.get(`/students/${id}`).
      pipe(map((res: { status: any, data: Student }) => res.data))
  }
}