import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ForgotPasswordService } from './data/forgot-password.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateOTPGuard implements CanActivate {
  constructor(
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const emailFound = this.forgotPasswordService.emailFound;
    const otpValid = this.forgotPasswordService.otpValid;
    if (!emailFound) {
      this.router.navigate(['/login/identify']);
      return false;
    }
    if (!otpValid) {
      this.router.navigate(['/login/code']);
      return false;
    }
    return true;
  }
}
