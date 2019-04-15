import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { StudentsService } from '../../services/students.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student';
import { ClassInfo } from '../../models/class-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})

export class StudentsListComponent implements OnInit {
  activeClass: Observable<Array<ClassInfo>>;
  notActiveClass: Observable<Array<ClassInfo>>;
  studentList: Observable<Array<Student>>;
  classId: number;
  showNowActive = false;
  searchValue = '';

  constructor(
    private classListService: ClassService,
    private studentsService: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activeClass = this.classListService.getClasses('active');
    this.notActiveClass = this.classListService.getClasses('inActive');
    this.studentList = this.studentsService.getSubject();
  }

  /**
   * Method return students list from one class
   * @returns - array with students in class
   */

  onSelectionClass($event): void {
    this.classId = $event.value;
    this.studentsService.loadStudents(this.classId);
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
