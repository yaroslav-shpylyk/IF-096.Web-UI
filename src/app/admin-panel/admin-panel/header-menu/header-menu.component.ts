import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class AdminHeaderMenuComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
