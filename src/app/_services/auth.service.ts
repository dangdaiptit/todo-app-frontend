import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(data: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', data, httpOptions);
  }

  userSignUp(data: any) {
    return this.http.post(AUTH_API + 'signup', data);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isUserLoggedIn(): boolean {
    // let user = localStorage.getItem('token');
    // return !(user === null);
    return !!localStorage.getItem('token');
  }

  // isTokenExpired(): boolean {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       const expiresAt = new Date(
  //         JSON.parse(atob(token.split('.')[1])).exp * 1000
  //       );
  //       console.log(new Date() > expiresAt);
  //       return new Date() > expiresAt;
  //     } else {
  //       return true;
  //     }
  //   } catch (error) {
  //     console.log('jwt error');
  //     return true;
  //   }
  // }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
