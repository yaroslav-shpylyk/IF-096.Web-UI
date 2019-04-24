import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { StudentsService } from '../../services/students.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student';
import { ClassInfo } from '../../models/class-info';
import { Observable } from 'rxjs';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent implements OnInit {
  activeClass: Observable<Array<ClassInfo>>;
  notActiveClass: Observable<Array<ClassInfo>>;
  classId: number;
  showNowActive = false;
  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[] = ['avatar', 'name', 'dateOfBirth', 'schoolClass', 'moreButton'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private classListService: ClassService,
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activeClass = this.classListService.getClasses('active');
    this.notActiveClass = this.classListService.getClasses('inActive');
    this.initStudentList();
  }

  /**
   * Method init student list, sort and refresh student in table
   */

  initStudentList(): void {
    this.studentsService.getSubject().subscribe((res: Array<Student>) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Method return students list from one class
   */

  onSelectionClass($event): void {
    this.classId = $event.value;
    this.studentsService.loadStudents(this.classId);
  }

  /**
   * Method open component for add new student
   */

  addStudent(): void {
    this.router.navigate(['add'], { relativeTo: this.route, queryParams: { classId: this.classId } });
  }

  /**
   * Method delete student
   */

  deleteStudent(id): void {
    this.studentsService.deleteStudent(id).subscribe(() => {
      this.studentsService.loadStudents(this.classId);
    });
  }

  /**
   * Method filter students list
   */

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
