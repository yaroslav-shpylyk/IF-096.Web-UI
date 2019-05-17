import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    if (window.location.href.includes('resetPassword')) {
      const url = new URL(window.location.href);
      const urlParams = new URLSearchParams(url.search);
      const token = urlParams.has('token') ? urlParams.get('token') : '';
      this.router.navigate(['login/change-password']);
      this.authService.setChangePasswordToken(token);
    }
    if (!this.authService.getChangePasswordToken()) {
      this.authService.checkTokenValidity();
    }
  }
}
