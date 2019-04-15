import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { JournalsStorageService } from 'src/app/services/journals-storage.service';
import { Journal } from 'src/app/models/journal-data';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';

@Component({
  selector: 'app-class-journal',
  templateUrl: './class-journal.component.html',
  styleUrls: ['./class-journal.component.scss']
})
export class ClassJournalComponent implements OnInit, OnDestroy {
  idClass: number;
  idTeacher: number;
  journal: any = [];
  filter: string;
  isLoading = false;
  private loadingSub: Subscription;
  teacher;
  idi;
  data;

  displayedColumns: string[] = ['num', 'subjectName', 'academicYear'];
  journalData;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private journalsStorageService: JournalsStorageService,
    private teachersStorageService: TeachersStorageService
  ) {}

  ngOnInit() {
    console.log(this.sort);

    this.loadingSub = this.journalsStorageService.loadingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.route.params.subscribe((params: Params) => {
      this.idClass = +params.idClass;
      this.idTeacher = +params.idTeacher;
      console.log(this.idTeacher);
      console.log(this.idClass);

      if (this.idTeacher) {
        this.teacher = this.teachersStorageService
          .getTeacher(this.idTeacher)
          .subscribe(teacher => {
            this.teacher = teacher;
          });
      }

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
          this.journalsStorageService.loadingStateChanged.next(false);
          console.log(this.journal);
          console.log(this.journalData.sort);
          console.log(this.sort);
        });
    });
  }

  applyFilter(filterValue: string = '') {
    this.filter = filterValue.trim().toLowerCase();
    this.journalData.filter = this.filter;
  }

  selectRow(row) {
    console.log(row);
    if (this.idTeacher) {
      this.router.navigate([
        `/journals/class/${row.idClass}/subject/${row.idSubject}`
      ]);
    } else {
      this.router.navigate(['subject', row.idSubject], {
        relativeTo: this.route
      });
    }
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
