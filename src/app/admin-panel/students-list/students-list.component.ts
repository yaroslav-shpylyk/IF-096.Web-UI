import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { StudentsService } from '../../services/students.service';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  activeClass: any;
  notActiveClass: any;
  toShowNotactiveClass: boolean = !true;
  studentList: any;


  constructor(private classList: ClassService, private students: StudentsService) { }

  ngOnInit() {
    this.classList.getClasses().subscribe((data: any) => {
      this.activeClass = data.filter((items: any) => items.isActive === true);
      this.notActiveClass = data.filter((items: any) => items.isActive === false);

    });
  }


  onSelectionClass($event) {
    console.log($event.value)
    this.students.getOneStudent($event.value).subscribe(list => this.studentList = list);
  }

}
