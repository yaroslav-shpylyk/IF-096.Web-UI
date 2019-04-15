import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TeacherData } from 'src/app/models/teacher-data';
import { TeachersStorageService } from 'src/app/services/teachers-storage.service';
import { ClassService } from 'src/app/services/class.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  journals;
  filter: string;
  activeClasses = [];
  inactiveClasses = [];
  teachers: TeacherData[];
  chosenClasses = 'activeClasses';

  displayedColumns: string[] = ['num', 'className', 'classYear'];
  displayedTeachersColumns: string[] = ['num', 'lastname', 'firstname'];
  dataSource;
  teachersData;

  @ViewChild('sortCol1') sortCol1: MatSort;
  @ViewChild('sortCol2') sortCol2: MatSort;

  constructor(
    private teachersStorageService: TeachersStorageService,
    private classService: ClassService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.classService.getClasses('all').subscribe(classes => {
      for (const clas of classes) {
        if (clas.isActive) {
          this.activeClasses.push(clas);
        } else {
          this.inactiveClasses.push(clas);
        }
      }

      this.dataSource = new MatTableDataSource(this[this.chosenClasses]);
      this.dataSource.sort = this.sortCol1;
    });

    this.teachersStorageService.getTeacherS().subscribe(teachers => {
      this.teachers = teachers;
      this.teachersData = new MatTableDataSource(this.teachers);
      this.teachersData.sort = this.sortCol2;
    });
  }

  handleChange(e) {
    this.dataSource = new MatTableDataSource(this[e.value]);
    this.dataSource.sort = this.sortCol1;
    this.applyFilter(this.filter);
  }

  applyFilter(filterValue: string = '') {
    this.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filter;
  }

  applyTeacherFilter(filterValue: string = '') {
    this.filter = filterValue.trim().toLowerCase();
    this.teachersData.filter = this.filter;
  }

  selectRow(row) {
    this.router.navigate(['class', row.id], {
      relativeTo: this.route
    });
  }

  selectTeacherRow(row) {
    this.router.navigate(['teacher', row.id], {
      relativeTo: this.route
    });
  }
}
