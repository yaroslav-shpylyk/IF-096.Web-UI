import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JournalsService {
  constructor() {}

  journalsChanged = new Subject();
  private journals = [];


  setJournals(journals) {
    console.log(journals)
    this.journals = journals;
    this.journalsChanged.next(this.journals.slice());
  }

  getJournals() {
    return this.journals.slice();
  }

}