import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

   /**
     * Method returns data with all techers from backend
  */

  constructor(private http: HttpClient) { }

  getTeachers() : Observable<any> {
    return this.http.get(`/teachers`)
      .pipe(map((res: any) => res.data))
  }
}

