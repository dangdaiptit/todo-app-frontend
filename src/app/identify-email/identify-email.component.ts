import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/data/user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ForgotPasswordService } from '../_services/data/forgot-password.service';

@Component({
  selector: 'app-identify-email',
  templateUrl: './identify-email.component.html',
  styleUrls: ['./identify-email.component.css'],
})
export class IdentifyEmailComponent implements OnInit {
  findEmailForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: NgToastService,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService
  ) {}

  ngOnInit(): void {
    this.findEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get findEmail() {
    return this.findEmailForm.controls;
  }

  findUserByEmail() {
    this.userService
      .checkExitUserByEmail(this.findEmail.email.value)
      .subscribe({
        next: (res) => {
          if (res) {
            this.forgotPasswordService.setEmailFound(true);
            this.forgotPasswordService.setEmai(this.findEmail.email.value);
            this.router.navigate(['/login/code']);
          } else {
            this.toast.error({
              summary: 'Account does not exist!',
              duration: 3000,
            });
          }
        },
      });
  }
}
