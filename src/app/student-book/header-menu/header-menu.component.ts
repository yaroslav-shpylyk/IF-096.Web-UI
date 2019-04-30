import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Student } from '../../models/student';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-student-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class StudentHeaderMenuComponent implements OnInit {
  public avatar: any;
  public firstName: string;
  public lastName: string;

  constructor(public auth: AuthService,
              private studentService: StudentsService) {
  }

  /**
   * Method which gets data of student by user's id
   */
  getStudent() {
    this.studentService.getOneStudent(this.auth.getUserId()).subscribe((student: Student) => {
      this.avatar = student.avatar;
      this.firstName = student.firstname;
      this.lastName = student.lastname;
    });
  }

  ngOnInit() {
    this.getStudent();
  }
}
