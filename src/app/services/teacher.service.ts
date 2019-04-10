import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

=======
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherData } from '../models/teacher-data';
>>>>>>> master

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

<<<<<<< HEAD
   /**
     * Method returns data with all techers from backend
  */

  constructor(private http: HttpClient) { }

  getTeachers() : Observable<any> {
    return this.http.get(`/teachers`)
      .pipe(map((res: any) => res.data))
  }
  getSubjects() : Observable<any> {
    return this.http.get(`/subjects`)
      .pipe(map((res: any) => res.data))
  }
  getClases() : Observable<any> {
    return this.http.get(`/classes`)
      .pipe(map((res: any) => res.data))
  }
}

=======
  constructor(private http: HttpClient) { }

  /**
   * Method gets number of all teachers
   * @returns - Number of classes
   */
  public getTeachers(): Observable<TeacherData[]> {
    return this.http.get('/teachers')
      .pipe(
        map((result: {status: any, data: TeacherData[]}) => result.data)
      );
  }
}
>>>>>>> master
