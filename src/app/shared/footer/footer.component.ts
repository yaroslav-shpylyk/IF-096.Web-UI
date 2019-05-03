import { Component, OnInit } from '@angular/core';
import { roles } from '../../enum/roles.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  /**
   * checks user's role for being admin
   * @returns true if user is admin
   */
  isAdmin() {
    const isAdmin = this.auth.getUserRole() === roles.admin;
    return isAdmin;
  }

  /**
   * checks user's role for being student (user)
   * @returns true if user is student (user)
   */
  isStudent() {
    const isStudent = this.auth.getUserRole() === roles.students;
    return isStudent;
  }

  /**
   * checks user's role for being teacher
   * @returns true if user is teacher
   */
  isTeacher() {
    const isTeacher = this.auth.getUserRole() === roles.teacher;
    return isTeacher;
  }

}
