import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TeacherData } from '../../models/teacher-data';
import { TeachersStorageService } from '../../services/teachers-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class TeacherHeaderMenuComponent implements OnInit {
  public avatar: any;
  public firstName: string;
  public lastName: string;
  public active: boolean;

  constructor(public auth: AuthService,
              private teachersService: TeachersStorageService,
              private router: Router) {
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
    this.activeRoute();
    this.getTeacher();
    this.router.events.subscribe(() => {
      this.activeRoute();
    }); // call on every routing change
  }

  /**
   * Function that checks active URL
   * add 'active' class to Journal section
   * if journals or separate journal are active URL
   */
  activeRoute() {
    if (this.router.url === '/journals/my-journals' || this.router.url.slice(0, 15) === '/journals/class') {
      this.active = true; // highlight section
    } else {
      this.active = false;
    }
  }
}
