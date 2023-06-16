import { Component } from '@angular/core';
import {
  FormGroup,
  AsyncValidatorFn,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Observable, map } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/data/user.service';
import { MatDialogRef } from '@angular/material/dialog';

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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  hide = true; // hide password
  hidec = true; //hide confirm password
  roleList: string[] = ['ADMIN'];
  formSignUp: FormGroup = new FormGroup({});
  selected = 'USER';

  constructor(
    private authService: AuthService,
    formBuider: FormBuilder,
    userService: UserService,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private toast: NgToastService
  ) {
    //signup
    this.formSignUp = formBuider.group(
      {
        username: [
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern(/^[a-z0-9_-]{3,20}$/),
            ],
            asyncValidators: usernameExistsValidator(userService),
            updateOn: 'blur',
          },
        ],
        email: [
          '',
          {
            validators: [Validators.required, Validators.email],
            asyncValidators: emailExistsValidator(userService),
            updateOn: 'blur',
          },
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
        role: [['USER'], Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  //addUser

  addUser() {
    const formValue = this.formSignUp.getRawValue(); // lấy giá trị của form
    const formattedValue = {
      username: formValue.username,
      email: formValue.email,
      role: formValue.role.map((role: string) => role.toLowerCase()),
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
    }; // định dạng lại giá trị của form theo định dạng yêu cầu

    this.authService.userSignUp(formattedValue).subscribe({
      next: () => {
        this.formSignUp.reset();
        this.toast.success({
          summary: 'Add User successful!',
          duration: 3000,
        });
        console.log(formattedValue);

        this.dialogRef.close('save');
      },
      error: () => {
        this.toast.error({
          summary: 'Add User failed!',
          duration: 3000,
        });
      },
    });
  }

  get signUp() {
    return this.formSignUp.controls;
  }

  onSubmit() {
    const formValue = this.formSignUp.getRawValue(); // lấy giá trị của form
    const formattedValue = {
      username: formValue.username,
      email: formValue.email,
      role: formValue.role.map((role: string) => role.toLowerCase()),
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
    }; // định dạng lại giá trị của form theo định dạng yêu cầu

  }
}
