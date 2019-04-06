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

  constructor(
    private classList: ClassService,
    private students: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.classList.getClasses('active').subscribe((data: Array<ClassInfo>) =>
      this.activeClass = data);
    this.classList.getClasses('inActive').subscribe((data: Array<ClassInfo>) =>
      this.notActiveClass = data);
  }

  /**
   * Method return students list from student service
   * @returns - array with students
   */

  onSelectionClass($event): void {
    this.students.getStudents($event.value).subscribe((list: Array<Student>) => this.studentList = list);
  }

  AddStudent(): void {
    console.log('button add student')
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}