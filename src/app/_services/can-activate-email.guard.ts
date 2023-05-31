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
export class CanActivateEmailGuard implements CanActivate {
  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
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
    if (!emailFound) {
      this.router.navigate(['/login/identify']);
      return false;
    }
    return true;
  }
}
