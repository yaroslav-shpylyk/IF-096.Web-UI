import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.authService.refreshToken().subscribe();
    } else {
      localStorage.setItem('token', '');
    }
  }
}
