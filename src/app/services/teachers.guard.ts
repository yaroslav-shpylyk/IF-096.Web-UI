import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router,
         RouterStateSnapshot } from '@angular/router';
import { TokenInfo } from '../models/token-info';
import { AuthService } from './auth.service';
import * as JWTDecoder from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TeachersGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.isTeacher()) {
      return false;
    }
    return true;
  }

  /**
   * Function that allows user to navigate to other route modules if it returns true
   * checks permissions only first time
   * @returns true if user's role is not ROLE_TEACHER
   * @returns false if user's role is ROLE_TEACHER
   */
  canLoad(route: Route): boolean {
    if (this.isTeacher()) {
      return false;
    }
    return true;
  }

  /**
   * Function that checks user's role -
   * @returns true if user's role == ROLE_TEACHER
   */
  private isTeacher(): boolean {
    const decodedToken: TokenInfo = JWTDecoder(this.authService.getToken());
    const role: string = decodedToken.Roles.authority;
    if (role === 'ROLE_TEACHER') {
      return true;
    }
    return false;
  }
}
