import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

private readonly url: string = 'http://35.228.220.5:8080';

  constructor(private http: HttpClient) { }

 /**
   * Method returns data with students from backend,where id is class
   */

  getStudents(id) : Observable<any> {
    return this.http.get(`${this.url}/students/classes/${id}`).
      pipe(map((res: any) => res.data))
  }
}