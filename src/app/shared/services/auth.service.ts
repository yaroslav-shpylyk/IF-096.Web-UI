import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginData } from '../models/login-data';
import { catchError, map } from 'rxjs/operators';

@Injectable()

export class AuthService {
  private readonly url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://35.228.220.5:8080';
  }
  public static logout(): void {
    localStorage.setItem('token', '');
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public login(userData: LoginData): Observable<any> {
    return this.http.post(`${this.url}/signin`, userData, { observe: 'response' })
      .pipe(
        map((response: any) => {
          const token: string = response.headers.get('Authorization');
          localStorage.setItem('token', token);
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
          return response;
        }),
        catchError(error => {
          if (error.status.code === 401) {
            localStorage.setItem('token', '');
          }
          // TODO: navigate to login page
          throw error;
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
}
