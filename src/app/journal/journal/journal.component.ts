import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { JournalsService } from '../journals.service';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';
import { MatSort, MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  journals;
  subscription: Subscription;
  distJournals = [];

  displayedColumns: string[] = ['idClass', 'className', 'academicYear'];
  dataSource;

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
        this.dataSource = new MatTableDataSource(
          this.journalsService.distinctJournals(this.journals)
        );
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
