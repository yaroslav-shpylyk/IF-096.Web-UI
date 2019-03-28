import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData } from '../models/login-data';
import { catchError, map } from 'rxjs/operators';

@Injectable()

export class AuthService {
  private readonly url: string;
  private tokenRefreshTimer: any;
  constructor(private http: HttpClient) {
    this.url = 'http://35.228.220.5:8080';
  }
  public static logout(): void {
    localStorage.setItem('token', '');
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public login(data: LoginData): Observable<any> {
    return this.http.post(`${this.url}/signin`, data, { observe: 'response' })
      .pipe(
        map((response: any) => {
          const token: string = response.headers.get('Authorization');
          localStorage.setItem('token', token);
          this.refreshTokenTimer();
          return response;
        })
      );
  }
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
            clearTimeout(this.tokenRefreshTimer);
            localStorage.setItem('token', '');
          }
          // TODO: navigate to login page
          return error;
        })
      );
  }
  public requestPassReset(query: string): Observable<any> {
    const data: object = {
      query
    };
    return this.http.get(`${this.url}/requestPasswordReset`, data);
  }
  public resetPass(password: string): Observable<any> {
    const token = this.getToken();
    const data: object = {
      password,
      token
    };
    return this.http.put(`${this.url}/resetPassword`, data);
  }
  public refreshTokenTimer(): void {
    clearTimeout(this.tokenRefreshTimer);
    const serviceRef = this;
    const delay = 300000;
    this.tokenRefreshTimer = setTimeout(function refresh() {
      serviceRef.refreshToken().subscribe();
      console.log(serviceRef.getToken());
      serviceRef.tokenRefreshTimer = setTimeout(refresh, delay);
    }, delay);
  }
}
