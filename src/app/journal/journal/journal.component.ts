import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JournalsService } from '../journals.service';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  journals;
  subscription: Subscription;

  constructor(
    private journalsService: JournalsService,
    private journalsStorageService: JournalsStorageService
  ) {}

  ngOnInit() {
    this.journals = this.journalsService.getJournals();
    if (!this.journals.length)
      this.journals = this.journalsStorageService.getAllJournals();
    this.subscription = this.journalsService.journalsChanged.subscribe(
      journals => {
        this.journals = journals;
      }
    );
  }
}
