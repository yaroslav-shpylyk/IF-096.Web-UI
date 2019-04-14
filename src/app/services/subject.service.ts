import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubjectData } from '../models/subject-data';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }
  /**
   * Method gets number of all subjects
   * @returns - Number of classes
   */
  public getSubjects(): Observable<SubjectData[]> {
    return this.http.get('/subjects')
      .pipe(
        map((result: {status: any, data: SubjectData[]}) => result.data)
      );
  }

  addSubject(subj: SubjectData) {
    return this.http.post<SubjectData>('/subjects/', subj);
  };

  editSubject(id, subj) {
    return this.http.put<SubjectData>(`/subjects/${id}`, subj);
  }
}
