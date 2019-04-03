import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  readonly url: string = 'http://35.228.220.5:8080'

  constructor(private http: HttpClient) { }

  getTeachers() : Observable<any> {
    return this.http.get(`http://35.228.220.5:8080/teachers`)
      .pipe(map((res: any) => res.data))
  }
}

