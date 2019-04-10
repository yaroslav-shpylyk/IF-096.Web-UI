import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private readonly url: string = 'http://35.228.220.5:8080';
  constructor(private authService: AuthService) { }

  /**
   * Method catch any request, then adds Authorization header with token, basic url of the backend server
   * and then returns an updated request
   * @param request - Incoming request
   * @param next - transforms httpRequest into a stream of HttpEvents, one of which will be HttpResponse
   * @returns - call of transformed request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: token,
        'Access-Control-Allow-Origin': '*'
      },
      url: this.url + request.url
    });
    return next.handle(request);
  }
}

