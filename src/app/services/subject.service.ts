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
  public getSubjects(classNumber?: string): Observable<SubjectData[]> {
    const classId = classNumber || '';
    return this.http.get(`/subjects?classId=${classId}`)
      .pipe(
        map((result: { status: any, data: SubjectData[] }) => result.data)
      );
  }

  /**
   * Method creates a new subject
   * @param subj - Object which we create
   */
  addSubject(subj: SubjectData): Observable<SubjectData> {
    return this.http.post<SubjectData>('/subjects/', subj);
  }

  /**
   * Method sends changes to an object which we want to modify
   * @param id - the data on which we refer to the object
   * @param subj - object which we modify
   */
  editSubject(id: number, subj: SubjectData): Observable<SubjectData> {
    return this.http.put<SubjectData>(`/subjects/${id}`, subj);
  }

  /**
   * Method fetches a single subject by provided id.
   * @param subjectId - number representing id.
   * @returns - object representing a subject.
   */
  public getSubject(subjectId: number): Observable<SubjectData> {
    return this.http.get(`/subjects/${subjectId}`).pipe(
      map((response: { status: any; data: SubjectData }) => {
        return response.data;
      })
    );
  }
}
