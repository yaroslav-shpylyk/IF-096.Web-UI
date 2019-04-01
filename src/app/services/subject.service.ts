import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SubjectResponse } from '../models/subject-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  public getSubjects(): Observable<any> {
    return this.http.get('/subjects')
      .pipe(
        map((result: SubjectResponse) => result.data)
      );
  }
}
