import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JournalsService } from '../journal/journals.service';

@Injectable()
export class JournalsStorageService {
  constructor(
    private httpClient: HttpClient,
    private journalsService: JournalsService
  ) {}

  getAllJournals() {
    return this.httpClient.get<any>('/journals').pipe(
      map(response => {
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

    return result;
  }
}
