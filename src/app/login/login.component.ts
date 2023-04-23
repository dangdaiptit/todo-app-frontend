import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/data/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

export function usernameExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{
    [key: string]: any
  } | null> => {
    const username = control.value;
    return userService.checkExitUserByUsername(username).pipe(
      map(exists => exists ? { 'usernameExists': true } : null)
    );
  };

}

export function emailExistsValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{
    [key: string]: any
  } | null> => {
    const email = control.value;
    return userService.checkExitUserByEmail(email).pipe(
      map(exists => exists ? { 'emailExists': true } : null)
    );
  };

}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  hide = true; // hide password
  hidec = true; //hide confirm password
  errorMessage = '';
  errorSignupMes = '';
  successSignupMes = '';
  formSignUp: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuider: FormBuilder,
    private userService: UserService) {

    this.formSignUp = formBuider.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{3,20}$/)], usernameExistsValidator(userService)],
      email: ['', [Validators.required, Validators.email], emailExistsValidator(userService)],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/)]],
      confirmPassword: ['', [Validators.required]],
      role: ['user']
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });

    this.loginForm = formBuider.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })

  }


  ngOnInit(): void {

  }

  get signUp() {
    return this.formSignUp.controls;
  }

  get login() {
    return this.loginForm.controls;
  }



  loginUser() {
    this.authService.login(this.loginForm.value).subscribe({
      next: data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        this.router.navigate(['/todos']);
      },

      error: err => {
        this.errorMessage = 'Login unsuccessful! Please check your login information again';
        setTimeout(() => {
          this.errorMessage = '';
        }, 4000);
      }
    })

  }


  //signUp

  userSignUp() {
    this.formSignUp.patchValue({ role: ['user'] });
    this.authService.userSignUp(this.formSignUp.value).subscribe({
      next: (res) => {
        this.successSignupMes = 'User registration successful!';
        setTimeout(() => {
          this.successSignupMes = '';
        }, 3000)
        this.formSignUp.reset();
      },

      error: (err) => {
        this.errorSignupMes = 'User registration failed!',
          setTimeout(() => {
            this.errorSignupMes = '';
          }, 3000);
      }
    })
  }

  checkExistUsername() {
    this.userService.checkExitUserByUsername(this.formSignUp.value.username).subscribe();
  }

  checkExistEmail() {
    this.userService.checkExitUserByEmail(this.formSignUp.value.email).subscribe();
  }

}
