import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/admin-panel/teachers/helpers/teacher.model';
import { TeacherData } from 'src/app/models/teacher-data';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';

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
  teachers: TeacherData[];

  displayedColumns: string[] = ['num', 'className', 'academicYear'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private journalsStorageService: JournalsStorageService,
    private teachersStorageService: TeachersStorageService
  ) {}

  ngOnInit() {
    this.journalsStorageService.getAllJournals().subscribe(journals => {
      this.journals = this.journalsStorageService.distinctJournals(journals);
      this.dataSource = new MatTableDataSource(this.journals);
      this.dataSource.sort = this.sort;
    });
    this.teachersStorageService.getTeacherS().subscribe(teachers => {
      console.log(teachers);
      this.teachers = teachers;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
