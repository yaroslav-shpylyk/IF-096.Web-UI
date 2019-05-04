import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = `Неможливо виконати: Помилка: ${error.error.status.message}. Код помилки:${error.error.status.code}`;
        if (error.error.status.message === 'Bad Request') {
          errorMessage = 'Неможливо зберегти! Даний об\'єкт вже існує!';
        } else if (error.error.status.message === 'Bad Credentials') {
          errorMessage = 'Ви ввели некоректні дані. Спробуйде ще раз!';
        }
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        return throwError(error);
      })
    );
  }
}
