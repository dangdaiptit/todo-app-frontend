import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ForgotPasswordService } from '../_services/data/forgot-password.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sent-otp',
  templateUrl: './sent-otp.component.html',
  styleUrls: ['./sent-otp.component.css'],
})
export class SentOtpComponent implements OnInit {
  count: number;
  interval: any;
  showCountdown: boolean = true;
  email: string = '';
  otp: string = '';
  sentOtped: boolean = false;
  ngOnInit(): void {
    if (!this.sentOtped) {
      this.requestSentOTP();
      this.sentOtped = true;
    }
  }

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private toast: NgToastService,
    private router: Router
  ) {
    this.startCountdown();
    this.email = forgotPasswordService.email;
  }

  startCountdown() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.showCountdown = true;
    this.count = 300;
    this.interval = setInterval(() => {
      this.count--;
      if (this.count == 0) {
        clearInterval(this.interval);
        this.showCountdown = false;
      }
    }, 1000);
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {}

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.otp = code;
    const data = {
      email: this.email,
      otp: this.otp,
    };
    this.forgotPasswordService.verifyOTP(data).subscribe({
      next: (res) => {
        this.forgotPasswordService.setOtpValid(true);
        this.router.navigate(['/login/new-password']);
      },
      error: (err) => {
        this.toast.error({ summary: 'Invalid OTP code' });
      },
    });
  }

  requestSentOTP() {
    const data = {
      email: this.email,
    };

    this.forgotPasswordService.requestSentOTP(data).subscribe({
      error: (err) => {
        this.toast.error({ summary: 'OTP sending failed!', duration: 3000 });
      },
    });
  }
}
