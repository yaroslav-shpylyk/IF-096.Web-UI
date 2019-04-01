import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassResponse } from '../models/class-response';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  public getClasses(): Observable<any> {
    return this.http.get('/classes')
      .pipe(
        map((result: ClassResponse) => result.data)
      );
  }
}
