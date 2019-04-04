import { Component, OnInit } from '@angular/core';
import { TeacherService } from "src/app/services/teacher.service";

@Component({
  selector: 'app-teacher-connection',
  templateUrl: './teacher-connection.component.html',
  styleUrls: ['./teacher-connection.component.scss']
})
export class TeacherConnectionComponent implements OnInit {

  result;

  constructor(private teacherService: TeacherService) {
    
  }

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(result => this.result = result);
    console.log('works');
   
      
  }

}
