import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  emailFound: boolean = false;
  otpValid: boolean = false;
  email: string = '';

  constructor(private http: HttpClient) {}

  setEmailFound(value: boolean) {
    this.emailFound = value;
  }

  setOtpValid(value: boolean) {
    this.otpValid = value;
  }

  setEmai(email: string) {
    this.email = email;
  }

  requestSentOTP(email: any) {
    return this.http.post(
      'http://localhost:8080/api/reset-password/request',
      email
    );
  }

  verifyOTP(data: any) {
    return this.http.post(
      'http://localhost:8080/api/reset-password/verify-otp',
      data
    );
  }

  resetPassword(email: any, data: any) {
    return this.http.put(
      `http://localhost:8080/api/reset-password?email=${email}`,
      data
    );
  }
}
