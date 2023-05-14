import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserService } from '../_services/data/user.service';
import { Router } from '@angular/router';

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

export function checkPassword(userService: UserService): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{
    [key: string]: any;
  } | null> => {
    const oldPassword = control.value;
    return userService
      .validPassword(oldPassword)
      .pipe(map((exists) => (exists ? null : { passwordValid: true })));
  };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  fChangePass: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.fChangePass = fb.group(
      {
        oldPassword: ['', [Validators.required], checkPassword(userService)],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: ConfirmedValidator('newPassword', 'confirmPassword'),
      }
    );
  }

  get fbChangePass() {
    return this.fChangePass.controls;
  }

  changePass() {
    this.userService.changePassword(this.fChangePass.value).subscribe({
      next: (res) => {
        alert('Your password has been changed successfully');
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(
          'Your password change request failed! Please check the information again.'
        );
      },
    });
  }
}
