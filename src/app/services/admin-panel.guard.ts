import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { TokenInfo } from '../models/token-info';
import * as JWTDecoder from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService) {
  }

  /**
   * Function that allows user to navigate to the current route module if it returns true
   * checks permission every time
   * @returns true if user's role is ROLE_ADMIN
   * @returns false if user's role is not ROLE_ADMIN
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
    if (this.isAdmin()) {
      return true;
    }
    return false;
  }

  /**
   * Function that allows user to navigate to current route modules if it returns true
   * checks permissions only first time
   * @returns true if user's role is ROLE_ADMIN
   * @returns false if user's role is not ROLE_ADMIN
   */
  canLoad(): boolean {
    if (this.isAdmin()) {
      return true;
    }
    return false;
  }

  /**
   * Function that checks user's role -
   * @returns true if user's role == ROLE_ADMIN
   */
  private isAdmin(): boolean {
    const decodedToken: TokenInfo = JWTDecoder(this.authService.getToken());
    const role: string = decodedToken.Roles.authority;
    if (role === 'ROLE_ADMIN') {
      return true;
    }
    return false;
  }
}
