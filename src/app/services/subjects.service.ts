import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subj } from '../models/subjects-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subj[]> {
    return this.http.get<Subj[]>('/subjects')
    .pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }
}
