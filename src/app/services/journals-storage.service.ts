import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Journal } from '../models/journal-data';

@Injectable()
export class JournalsStorageService {
  constructor(private httpClient: HttpClient) {}

  getAllJournals(): Observable<Journal[]> {
    return this.httpClient.get<any>('/journals').pipe(
      map((response: { status: any; data: Journal[] }) => {
        const journals = response.data;
        return journals;
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

  getJournal(id): Observable<Journal> {
    return this.httpClient.get('/journals/class/{idClass}').pipe(
      map((response: { status: any; data: Journal }) => {
        const journal = response.data;
        return journal;
      })
    );
  }
}
