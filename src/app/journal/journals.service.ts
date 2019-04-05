import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JournalsService {
  constructor() {}

  journalsChanged = new Subject();
  private journals = [];

  setJournals(journals) {

    this.journals = journals;
    this.journalsChanged.next(this.journals.slice());
  }

  getJournals() {
    return this.journals.slice();
  }

  distinctJournals(journals) {
    const result = [];
    const map = new Map();
    for (const item of journals) {
      if (!map.has(item.idClass)) {
        map.set(item.idClass, true); 
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
