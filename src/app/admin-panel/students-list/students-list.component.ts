import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { StudentsService } from '../../services/students.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student';
import { ClassInfo } from '../../models/class-info';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent implements OnInit {
  activeClass: Array<ClassInfo>;
  notActiveClass: Array<ClassInfo>;
  studentList: Array<Student>;
  classId: number;
  showNowActive = false;
  searchValue = '';

  constructor(
    private classList: ClassService,
    private students: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.classList.getClasses('active').subscribe((data: Array<ClassInfo>) =>
      this.activeClass = data);
    this.classList.getClasses('inActive').subscribe((data: Array<ClassInfo>) => {
      this.notActiveClass = data;
    });
    this.students.getSubject()
      .subscribe(students => {
        this.studentList = students;
      });
  }

  /**
   * Method return students list from one class
   * @returns - array with students in class
   */

  onSelectionClass($event): void {
    this.classId = $event.value;
    this.students.loadStudents(this.classId);
  }

  /**
   * Method open component for add new student
   */

  AddStudent(): void {
    this.router.navigate(['add'], { relativeTo: this.route, queryParams: { classId: this.classId } });
  }

  /**
   * Method pipe students list
   */

  onSearch(event): void {
    this.searchValue = event;
  }
}
