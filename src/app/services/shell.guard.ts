import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from "@angular/router";
import { AuthService } from "./auth.service";
import { roles } from "../enum/roles.enum";


@Injectable({
  providedIn: 'root'
})
export class ShellGuard implements CanActivate, CanLoad {

  roles: Array<string> = [roles[0], roles[1], roles[2]];

  constructor(public auth: AuthService, private router: Router) {
  }

  /**
  * Method check are you logged. If you are logged, method check roles from 
  * token and  you will enter to shell component, if not,
  * you will be redirect to login component
  * @returns - if you have logged return true, else false
  */

  canActivate(): boolean {

    if (this.IsLogged()) {
      return true
    }
    this.router.navigate(['login']);
    return false;
  }

  canLoad(): boolean {
    if (this.IsLogged()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  IsLogged(): boolean {
    let checkRoleInToken: string | boolean = this.auth.getUserRole();
    return this.roles.some(role => role === checkRoleInToken);
  }
}