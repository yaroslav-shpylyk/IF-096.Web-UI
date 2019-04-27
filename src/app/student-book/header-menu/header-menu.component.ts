import {Component, Inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Student} from '../../models/student';
import {StudentsService} from '../../services/students.service';
import {ActivatedRoute} from '@angular/router';
import {AvatarComponent} from '../../shared/avatar/avatar.component';

@Component({
  selector: 'app-student-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class StudentHeaderMenuComponent implements OnInit {
  public fullName;

  constructor(public auth: AuthService) { }

  ngOnInit() {

  }

}
