import {Component, Inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class TeacherHeaderMenuComponent implements OnInit {
  public fullName;

  constructor(public auth: AuthService) { }

  ngOnInit() {

  }

}
