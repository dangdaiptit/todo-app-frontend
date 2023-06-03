import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/data/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgToastService } from 'ng-angular-popup';
import { MatTabGroup } from '@angular/material/tabs';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmedValidator']
    ) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function usernameExistsValidator(
  userService: UserService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{
    [key: string]: any;
  } | null> => {
    const username = control.value;
    return userService
      .checkExitUserByUsername(username)
      .pipe(map((exists) => (exists ? { usernameExists: true } : null)));
  };
}

export function emailExistsValidator(
  userService: UserService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{
    [key: string]: any;
  } | null> => {
    const email = control.value;
    return userService
      .checkExitUserByEmail(email)
      .pipe(map((exists) => (exists ? { emailExists: true } : null)));
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true; // hide password
  hidec = true; //hide confirm password
  formSignUp: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuider: FormBuilder,
    private userService: UserService,
    private toast: NgToastService
  ) {
    //signup
    this.formSignUp = formBuider.group(
      {
        username: [
          '',
          [Validators.required, Validators.pattern(/^[a-z0-9_-]{3,20}$/)],
          usernameExistsValidator(userService),
        ],
        email: [
          '',
          [Validators.required, Validators.email],
          emailExistsValidator(userService),
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        role: ['user'],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );

    //login
    this.loginForm = formBuider.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get signUp() {
    return this.formSignUp.controls;
  }

  get login() {
    return this.loginForm.controls;
  }

  loginUser() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        // localStorage.setItem('token', data.token);
        this.authService.storeToken(data.token);
        this.authService.storeRefreshToken(data.refreshToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('roles', data.roles);
        if (data.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/manager-user']);
        } else {
          this.router.navigate(['/todos']);
        }

        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Login successfully!',
          duration: 3000,
        });
      },

      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Login failed!',
          duration: 3000,
        });
      },
    });
  }

  //signUp

  userSignUp() {
    this.formSignUp.patchValue({ role: ['user'] });
    this.authService.userSignUp(this.formSignUp.value).subscribe({
      next: (res) => {
        this.formSignUp.reset();
        this.toast.success({
          summary: 'User registration successful!',
          duration: 3000,
        });
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.toast.error({
          summary: 'User registration failed!',
          duration: 3000,
        });
      },
    });
  }
}
