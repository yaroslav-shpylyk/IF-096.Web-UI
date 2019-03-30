import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { LoginData } from '../models/login-data';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as JWTDecoder from 'jwt-decode';
import { TokenInfo } from '../models/token-info';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly url: string = 'http://35.228.220.5:8080';
  private tokenRefreshTimer: any;
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
    return this.http.post(`${this.url}/signin`, data, { observe: 'response' })
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
    return this.http.get(`${this.url}/refresh`, { observe: 'response' })
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
  public requestPassReset(query: string): Observable<any> {
    const data: object = {
      query
    };
    return this.http.get(`${this.url}/requestPasswordReset`, data);
  }

  /**
   * Method resets current password
   * @param password - Users password
   * @returns - New password
   */
  public resetPass(password: string): Observable<any> {
    const token = this.getToken();
    const data: object = {
      password,
      token
    };
    return this.http.put(`${this.url}/resetPassword`, data);
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
    localStorage.setItem('token', '');
  }
  /**
  * Method gets user's role from token
  * @returns - User role
  */
  public getUserRole(): string {
    const decodedToken: TokenInfo = JWTDecoder(this.getToken());
    console.log(decodedToken);
    return decodedToken.Roles.authority;
  }
}
