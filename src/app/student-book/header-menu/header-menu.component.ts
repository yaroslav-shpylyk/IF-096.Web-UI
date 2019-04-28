import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from '../../services/header.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class StudentHeaderMenuComponent implements OnInit {
  public fullName;
  public avatar;
  public firstName;
  public lastName;

  constructor(public auth: AuthService,
              public headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.getStudent(this.auth.getUserId()).subscribe((student: Student) => {
      console.log(student);
      this.fullName = `${student.firstname} ${student.lastname}`;
      this.avatar = student.avatar;
      this.firstName = student.firstname;
      this.lastName = student.lastname;
    });
  }
}
