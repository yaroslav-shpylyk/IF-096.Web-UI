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
    this.httpClient
      .get('/journals')
      .pipe(
        map(response => {
          let journals = response['data'];
          return journals;
        })
      )

      .subscribe(
        journals => {
          this.journalsService.setJournals(journals);
        },
        error => console.log(error)
      );
  }
}
