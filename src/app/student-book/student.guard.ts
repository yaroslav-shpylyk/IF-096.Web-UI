import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanLoad, Route,
  Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {TokenInfo} from '../models/token-info';
import * as JWTDecoder from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.isStudent()) {
      return false;
    }
    return true;
  }

  /**
   * Function that allows user to navigate to other route modules if it returns true
   * checks permissions only first time
   * @returns true if user's role is not ROLE_ADMIN
   * @returns false if user's role is ROLE_ADMIN
   */
  canLoad(route: Route): boolean {
    if (this.isStudent()) {
      return false;
    }
    return true;
  }

  /**
   * Function that checks user's role -
   * @returns true if user's role == ROLE_ADMIN
   */
  private isStudent(): boolean {
    const decodedToken: TokenInfo = JWTDecoder(this.authService.getToken());
    const role: string = decodedToken.Roles.authority;
    if (role === 'ROLE_USER') {
      return true;
    }
    return false;
  }
}
