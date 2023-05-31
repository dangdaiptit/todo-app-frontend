import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { UserRole } from '../model/roles';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userRoles = this.authService.getRoles();

    if (
      this.authService.isUserLoggedIn() &&
      userRoles?.includes(UserRole.Admin)
    ) {
      return true;
    }

    if (
      this.authService.isUserLoggedIn() &&
      !userRoles?.includes(UserRole.Admin)
    ) {
      alert('You do not have access!');
      this.router.navigate(['']);
      return false;
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
