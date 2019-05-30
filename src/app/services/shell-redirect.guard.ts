import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { roles } from '../enum/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class ShellRedirectGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  /**
   * Function that always redirects
   * depending on user's role
   * checks permission every time
   * @returns false always
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.getUserRole() === roles.admin) {
      this.router.navigate(['/admin-panel/']);
    } else if (this.authService.getUserRole() === roles.teacher) {
      this.router.navigate(['journals', 'my-journals']);
    } else if (this.authService.getUserRole() === roles.students) {
      this.router.navigate(['/student-book/']);
    }
    return false;
  }
}
