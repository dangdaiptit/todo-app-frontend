import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../_services/data/user.service';
import { ForgotPasswordService } from '../_services/data/forgot-password.service';

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

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  email: string = '';
  fChangePass: FormGroup = new FormGroup({});
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService,
    private userService: UserService,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.fChangePass = fb.group(
      {
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
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }
  get fbChangePass() {
    return this.fChangePass.controls;
  }

  resetPassword() {
    this.email = this.forgotPasswordService.email;
    this.forgotPasswordService
      .resetPassword(this.email, this.fChangePass.value)
      .subscribe({
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
