import { Injectable } from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TeacherData} from '../models/teacher-data';
import {HttpClient} from '@angular/common/http';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private httpClient: HttpClient) { }


  getTeacher(id): Observable<TeacherData> {
    return this.httpClient.get(`/teachers/${id}`).pipe(
      map((response: { status: any; data: TeacherData }) => response.data)
    );
  }

  getStudent(id): Observable<Student> {
    return this.httpClient.get(`/students/${id}`).pipe(
      map((response: { status: any; data: Student }) => response.data)
    );
  }

}
