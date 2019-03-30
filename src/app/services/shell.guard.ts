import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service"


@Injectable({
  providedIn: 'root'
})
export class ShellGuard implements CanActivate {

  roles: Array<string> = ['ROLE_TEACHER', 'ROLE_USER', 'ROLE_ADMIN'];

  constructor(public auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.roles.some(role => role === this.auth.getUserRole())) {
      return true
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
