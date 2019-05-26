import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss']
})
export class TeacherFooterMenuComponent implements OnInit {
  public active: boolean;

  constructor(public auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.activeRoute();
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
