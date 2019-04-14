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

  /**
   * Function that allows user to access to current route (declared in routing module),
   * checks permission every time
   * @returns true if user's role is ROLE_TEACHER
   * @returns false if user's role isn't ROLE_TEACHER
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log(next);
    return this.isTeacher(next.routeConfig.path);
  }

  /**
   * Function that allows user to access to current route module if it returns true
   * checks permissions only first time
   * @returns true if user's role is ROLE_TEACHER
   * @returns false if user's role is not ROLE_TEACHER
   */
  canLoad(route: Route): boolean {
    return this.isTeacher();
  }

  /**
   * Function that checks user's role -
   * @returns true if user's role == ROLE_TEACHER
   */
  private isTeacher(route?): boolean {
    const decodedToken: TokenInfo = JWTDecoder(this.authService.getToken());
    const role: string = decodedToken.Roles.authority;
    if (role === 'ROLE_TEACHER' || (role === 'ROLE_ADMIN' && route === 'journals')) {
      return true;
    }
    return false;
  }
}
