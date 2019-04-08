import { Component, OnInit } from '@angular/core';
import { TeacherService } from "src/app/services/teacher.service";

@Component({
  selector: 'app-teacher-connection',
  templateUrl: './teacher-connection.component.html',
  styleUrls: ['./teacher-connection.component.scss']
})
export class TeacherConnectionComponent implements OnInit {

  teachers;
  subjects;
  classes;

  constructor(private teacherService: TeacherService) {
    
  }

  ngOnInit() {
    this.teacherService.getTeachers()
      .subscribe(teachers => this.teachers = teachers);
    
    this.teacherService.getSubjects()
      .subscribe(subjects => this.subjects = subjects);

    this.teacherService.getClases()
      .subscribe(classes => this.classes = classes);
      
  }

}
