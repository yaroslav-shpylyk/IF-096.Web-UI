import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';
import { HttpClient } from '@angular/common/http';
import { Journal } from 'src/app/models/journal-data';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-class-journal',
  templateUrl: './class-journal.component.html',
  styleUrls: ['./class-journal.component.scss']
})
export class ClassJournalComponent implements OnInit {
  idClass: number;
  idTeacher: number;
  journal;
  journalData;
  filter: string;

  idi;
  data;

  displayedColumns: string[] = ['num', 'subjectName', 'className'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private journalsStorageService: JournalsStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idClass = +params.idClass;
      this.idTeacher = +params.idTeacher;

      console.log(`idClass ${this.idClass}`);
      console.log(`idTeacher ${this.idTeacher}`);

      if (!this.idClass && !this.idTeacher) {
        this.idTeacher = this.authService.getUserId();

        console.log(`shas ${this.idTeacher}`);
      }

      this.idi = this.idClass ? this.idClass : this.idTeacher;
      this.data = this.idClass ? 'class' : 'teachers';

      this.journalsStorageService
        .getJournal(this.idi, this.data)
        .subscribe(journal => {
          this.journal = journal;
          this.journalData = new MatTableDataSource(this.journal);
          this.journalData.sort = this.sort;
          console.log(journal);
        });
    });
  }

  applyFilter(filterValue: string = '') {
    this.filter = filterValue.trim().toLowerCase();
    this.journalData.filter = this.filter;
  }

  selectRow(row) {
    console.log(row);
    // this.router.navigate(['class', row.id], {
    //   relativeTo: this.route
    // });
  }
}
