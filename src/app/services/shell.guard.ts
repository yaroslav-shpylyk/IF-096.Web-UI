import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { roles } from "../enum/roles.enum";


@Injectable({
  providedIn: 'root'
})
export class ShellGuard implements CanActivate {

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

    let checkRoleInToken: string | boolean = this.auth.getUserRole();
    let findcheckedRoleInEnum: boolean = this.roles.some(role => role === checkRoleInToken);
    if (findcheckedRoleInEnum) {
      return true
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
