import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TeacherData } from '../../models/teacher-data';
import { TeachersStorageService } from '../../services/teachers-storage.service';

@Component({
  selector: 'app-teacher-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class TeacherHeaderMenuComponent implements OnInit {
  public avatar: any;
  public firstName: string;
  public lastName: string;

  constructor(public auth: AuthService,
              private teachersService: TeachersStorageService) {
  }

  /**
   * Method which gets data of teacher by user's id
   */
  getTeacher() {
    this.teachersService.getTeacher(this.auth.getUserId()).subscribe((teacher: TeacherData) => {
      this.firstName = teacher.firstname;
      this.lastName = teacher.lastname;
      this.avatar = teacher.avatar;
    });
  }

  ngOnInit() {
    this.getTeacher();
  }
}
