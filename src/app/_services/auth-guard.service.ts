import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserRole } from '../model/roles';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRoles = this.authService.getRoles();

    if (this.authService.isUserLoggedIn() && userRoles?.includes(UserRole.User)) {
      return true;
    }
    this.toast.error({
      detail: 'ERROR',
      summary: 'Please Login First!',
      duration: 3000,
    });
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
