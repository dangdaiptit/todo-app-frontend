import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../_services/data/user.service';
import { Observable, map } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
// adding to the page props

export function checkPassword(userService: UserService): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{
    [key: string]: any;
  } | null> => {
    const password = control.value;
    return userService
      .validPassword(password)
      .pipe(map((exists) => (exists ? null : { passwordValid: true })));
  };
}

export function checkEmail(userService: UserService): AsyncValidatorFn {
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
  selector: 'app-change-email-user',
  templateUrl: './change-email-user.component.html',
  styleUrls: ['./change-email-user.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ChangeEmailUserComponent implements OnInit {
  passwordFormGroup: FormGroup = new FormGroup({});
  emailFormGroup: FormGroup = new FormGroup({});
  message: string;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private toast: NgToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.passwordFormGroup = _formBuilder.group({
      password: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: checkPassword(userService),
          updateOn: 'blur',
        },
      ],
    });

    this.emailFormGroup = _formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: checkEmail(userService),
          updateOn: 'blur',
        },
      ],
    });
  }

  get fbPasswordFormGroup() {
    return this.passwordFormGroup.controls;
  }

  get fbEmailFormGroup() {
    return this.emailFormGroup.controls;
  }

  changeEmail() {
    let passwordValue = this.passwordFormGroup.getRawValue();
    let emailValue = this.emailFormGroup.getRawValue();

    let changeEmailRequest = {
      password: passwordValue.password,
      email: emailValue.email,
    };

    this.userService.changeEmail(changeEmailRequest).subscribe({
      next: (res) => {
        this.message = 'Your email has been changed successfully';
        this.toast.success({
          summary: 'Your email has been changed successfully',
          duration: 3000,
        });
        // this.router.navigate(['/user/profile-account']);
      },
      error: (err) => {
        this.message = 'Your email change request failed!';
        this.toast.error({
          summary: 'Your email change request failed!',
          duration: 3000,
        });
      },
    });
  }

  ngOnInit() {}
}
