import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherResponse } from '../models/teacher-response';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  /**
   * Method gets number of all teachers
   * @returns - Number of classes
   */  public getTeachers(): Observable<any> {
    return this.http.get('/teachers')
      .pipe(
        map((result: TeacherResponse) => result.data)
      );
  }
}
