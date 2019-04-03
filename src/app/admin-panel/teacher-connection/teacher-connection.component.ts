import { Component, OnInit } from '@angular/core';
import { TeacherService } from "src/app/services/teacher.service";

@Component({
  selector: 'app-teacher-connection',
  templateUrl: './teacher-connection.component.html',
  styleUrls: ['./teacher-connection.component.scss']
})
export class TeacherConnectionComponent implements OnInit {



  constructor(private teacherService: TeacherService) {
    console.log('done');
  }

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(result => console.log(result));
    console.log('works');
      
  }

}
