import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from '../../services/header.service';
import { Student} from '../../models/student';

@Component({
  selector: 'app-student-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class StudentHeaderMenuComponent implements OnInit {
  public studentData;
  public fullName;
  public avatar;
  public showAbbr: boolean;
  public showAvatar: boolean;

  constructor(public auth: AuthService,
              public headerService: HeaderService) { }

  showFullName() {
    this.headerService.getStudent(this.auth.getUserId()).subscribe((student: Student) => {
      this.studentData = student;
      this.fullName = `${this.studentData.firstname} ${this.studentData.lastname}`;

      if(this.studentData.avatar === '/img/profile.png'){
        this.showAbbr = true;
        this.showAvatar = false;
      }else if (this.studentData.avatar) {
        this.showAvatar = true;
        this.showAbbr = false;
        this.avatar = this.studentData.avatar;

      }
    });
  }

  ngOnInit() {
    this.showFullName();
  }

}
