import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service"

@Injectable({
  providedIn: 'root'
})
export class ShellGuard implements CanActivate {
  constructor(public auth: AuthService) {

  }

  canActivate(): boolean {
    console.log("guard-here")
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    return true;
  }
}
