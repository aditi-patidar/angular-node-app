/*
  Created by: Aditi Patidar
  Date: Nov 24, 2022
  This is the common place to handle error and success messages.
*/
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService } from '../services/shared/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          if (error.error && error.error.status != 0) {
            errorMessage = `Error Code: ${error.error.status}\nMessage: ${error.error.message}`;
            // call the log out to clear all the local storage data if the express app returned the token expired error
            if (error.error.errorCode == 'TOKEN_EXPIRED') {
              this.authService.logOut();
            }
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }
        this.alertService.setAlert(errorMessage, 'danger')
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    )
  }
}
