import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  /**
    * Method returns data with students from backend,where id is class
    */

  getStudents(id): Observable<any> {
    return this.http.get(`/students/classes/${id}`).
      pipe(map((res: any) => res.data))
  }

  getOneStudent(id): Observable<any> {
    return this.http.get(`/students/${id}`).
      pipe(map((res: any) => res.data))
  }
}