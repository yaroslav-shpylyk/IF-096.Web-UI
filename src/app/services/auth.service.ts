import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { LoginData } from '../models/login-data';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as JWTDecoder from 'jwt-decode';
import { TokenInfo } from '../models/token-info';
import { ChangePasswordRequest } from '../models/change-password-request';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenRefreshTimer: any;
  private changePasswordToken = '';
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Method logout's user
   */
  public logout(): void {
    localStorage.setItem('token', '');
    clearTimeout(this.tokenRefreshTimer);
    this.router.navigate(['/login']);
  }

  /**
   * Method returns token from localstorage
   * @returns - Current token
   */
  public getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * Method get token from server and saves to localstorage
   * @param data - This is object with user's username and password
   * @returns - New token
   */
  public login(data: LoginData): Observable<any> {
    return this.http.post(`/signin`, data, { observe: 'response' })
      .pipe(
        map((response: any) => {
          const token: string = response.headers.get('Authorization');
          localStorage.setItem('token', token);
          this.refreshTokenTimer();
          this.router.navigate(['']);
          return response;
        })
      );
  }

  /**
   * Method use current token to get new token
   * @returns - New token
   */
  public refreshToken(): Observable<any> {
    return this.http.get(`/refresh`, { observe: 'response' })
      .pipe(
        map((response: any) => {
          const newToken = response.headers.get('Authorization');
          localStorage.setItem('token', newToken);
          this.refreshTokenTimer();
          return response;
        }),
        catchError((error: any) => {
          if (error.status.code === 401) {
            this.logout();
          }
          return error;
        })
      );
  }

  /**
   * Method send link to email to reset user's password
   * @param query - Users login or email
   * @returns - Status of recovery process
   */
  public requestPasswordChange(query: string): Observable<any> {
    return this.http.get(`/requestPasswordReset?query=${query}`);
  }

  /**
   * Method resets current password
   * @param password - Users password
   * @param token - Token for change password
   * @returns - New password
   */
  public changePassword(password: string, token: string): Observable<any> {
    const data: ChangePasswordRequest = {
      password,
      token
    };
    return this.http.put(`/resetPassword`, data);
  }

  /**
   * Method creates recursive timeout which refreshes token after delay
   */
  public refreshTokenTimer(): void {
    clearTimeout(this.tokenRefreshTimer);
    const serviceRef: AuthService = this;
    const delay = 300000;
    this.tokenRefreshTimer = setTimeout(function refresh() {
      serviceRef.refreshToken().subscribe();
      serviceRef.tokenRefreshTimer = setTimeout(refresh, delay);
    }, delay);
  }

  /**
   * Method checks if current token is valid and refreshes it to continue current session
   * @returns - New token or nothing
   */
  public checkTokenValidity(): Subscription | void {
    if (this.getToken()) {
      const decodedToken: TokenInfo = JWTDecoder(this.getToken());
      const expTime: number = decodedToken.exp;
      if (expTime * 1000 > Date.now()) {
        return this.refreshToken().subscribe();
      }
    }
    this.logout();
  }

  /**
   * Method gets user's role from token
   * @returns - User role
   */
  public getUserRole(): string | boolean {
    if (this.getToken()) {
      const decodedToken: TokenInfo = JWTDecoder(this.getToken());
      return decodedToken.Roles.authority;
    } else {
      return false;
    }
  }

  public getUserId(): number  {
    const decodedToken: TokenInfo = JWTDecoder(this.getToken());
    return decodedToken.jti;
  }

  /**
   * Method returns token for change password
   * @returns - token
   */
  public getChangePasswordToken(): string {
    return this.changePasswordToken;
  }

  /**
   * Method sets new token to change password token variable
   * @param token - new token
   */
  public setChangePasswordToken(token: string): void {
    this.changePasswordToken = token;
  }
}
