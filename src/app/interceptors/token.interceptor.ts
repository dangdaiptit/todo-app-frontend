import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from '../model/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => new Error('Some other error occured'));
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    const data = {
      refreshToken: this.auth.getRefreshToken(),
    };

    return this.auth.renewToken(data).pipe(
      switchMap((tokenData: TokenApiModel) => {
        this.auth.storeRefreshToken(tokenData.refreshToken);
        this.auth.storeToken(tokenData.accessToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${tokenData.accessToken}` },
        });
        return next.handle(req);
      }),
      catchError((err) => {
        this.auth.onLogout();
        this.toast.warning({
          detail: 'Warning',
          summary: 'Token is expired, Login again',
          duration: 5000,
        });
        return throwError(err);
      })
    );
  }
}
