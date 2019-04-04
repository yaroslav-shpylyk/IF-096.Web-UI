import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { StudentsService } from '../../services/students.service';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  activeClass: Array<any>;
  notActiveClass: Array<any>;
  studentList: Array<any>;

  constructor(private classList: ClassService, private students: StudentsService) { }

  ngOnInit() {
    this.classList.getClasses('all').subscribe((data: any) => {
      this.activeClass = data.filter((items: any) => items.isActive === true);
      this.notActiveClass = data.filter((items: any) => items.isActive === false);
    });
  }

  /**
   * Method return students list from student service
   * @returns - array with students
   */

  onSelectionClass($event): void {
    this.students.getStudents($event.value).subscribe(list => this.studentList = list);
  }
}
