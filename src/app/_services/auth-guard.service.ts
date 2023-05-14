import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    // alert('The session has expired. Please log in again!');
    this.toast.error({
      detail: 'ERROR',
      summary: 'Please Login First!',
      duration: 3000,
    });
    localStorage.clear();
    this.router.navigate(['login']);
    return false;
  }
}
