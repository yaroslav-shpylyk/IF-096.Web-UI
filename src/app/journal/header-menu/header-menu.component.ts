import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from '../../services/header.service';
import { TeacherData } from '../../models/teacher-data';

@Component({
  selector: 'app-teacher-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class TeacherHeaderMenuComponent implements OnInit {
  public fullName;
  public avatar;
  public firstName;
  public lastName;

  constructor(public auth: AuthService,
              public headerService: HeaderService) {
  }

  ngOnInit() {
    this.headerService.getTeacher(this.auth.getUserId()).subscribe((teacher: TeacherData) => {
      console.log(teacher);
      this.fullName = `${teacher.firstname} ${teacher.lastname}`;
      this.firstName = teacher.firstname;
      this.lastName = teacher.lastname;
      this.avatar = teacher.avatar;
    });
  }
}
