import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {TeacherConnectionComponent} from 'src/app/admin-panel/teacher-connection/teacher-connection.component';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

// const endpoint = '/journal';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
//   })
// };
sentDataTojornal (data, teacherId, classId, subjectId) {
  
  return this.http.post<any>(`/teachers/${teacherId}/classes/${classId}/subjects/${subjectId}/journal`, data)
  .pipe(map(res=> console.log(res)))
}



}