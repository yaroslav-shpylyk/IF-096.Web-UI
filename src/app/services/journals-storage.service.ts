import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Journal } from '../models/journal-data';

@Injectable()
export class JournalsStorageService {
  constructor(private httpClient: HttpClient) {}

  loadingStateChanged = new Subject<boolean>();

  getAllJournals(): Observable<Journal[]> {
    return this.httpClient.get<any>('/journals').pipe(
      map((response: { status: any; data: Journal[] }) => {
        const journals = response.data;
        return journals;
      })
    );
  }

  getJournaL(idSubject, idClass): Observable<Journal[]> {
    this.loadingStateChanged.next(true);
    return this.httpClient
      .get(`/journals/subjects/${idSubject}/classes/${idClass}`)
      .pipe(
        map((response: { status: any; data: Journal[] }) => {
          const journal = response.data;
          return journal;
        })
      );
  }

  distinctJournals(journals) {
    const result = [];
    const mapped = new Map();
    for (const item of journals) {
      if (!mapped.has(item.idClass)) {
        mapped.set(item.idClass, true);
        result.push({
          idClass: item.idClass,
          className: item.className,
          academicYear: item.academicYear
        });
      }
    }
    console.log(result);
    return result;
  }

  getClassJournal(idClass): Observable<Journal> {
    return this.httpClient.get(`/journals/class/${idClass}`).pipe(
      map((response: { status: any; data: Journal }) => {
        const journal = response.data;
        return journal;
      })
    );
  }

  getTeacherJournal(idTeacher): Observable<Journal> {
    return this.httpClient.get(`/journals/teachers/${idTeacher}`).pipe(
      map((response: { status: any; data: Journal }) => {
        const journal = response.data;
        return journal;
      })
    );
  }

  getJournal(id, data): Observable<Journal> {
    this.loadingStateChanged.next(true);
    return this.httpClient.get(`/journals/${data}/${id}`).pipe(
      map((response: { status: any; data: Journal }) => {
        const journal = response.data;
        return journal;
      })
    );
  }

  saveMark(obj): Observable<any> {
    return this.httpClient.post(`/marks`, obj, {
      observe: 'response'
    });
  }
}
