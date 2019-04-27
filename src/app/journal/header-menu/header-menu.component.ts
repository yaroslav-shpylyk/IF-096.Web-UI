import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-teacher-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})


export class TeacherHeaderMenuComponent implements OnInit {
  public teacherData;
  public fullName;
  public avatar;
  public showAbbr: boolean;
  public showAvatar: boolean;

  constructor(public auth: AuthService,
              public headerService: HeaderService) { }

  showFullName() {
    this.headerService.getTeacher(this.auth.getUserId()).subscribe(result => {
      this.teacherData = result;
      this.fullName = `${result.firstname} ${result.lastname}`;
      if(this.teacherData.avatar === '/img/profile.png'){
        this.showAbbr = true;
        this.showAvatar = false;
      }else if (this.teacherData.avatar) {
        this.showAvatar = true;
        this.showAbbr = false;
        this.avatar = this.teacherData.avatar;

      }
    });
  }

  ngOnInit() {
     this.showFullName();

  }

}
