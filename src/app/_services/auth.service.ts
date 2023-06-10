import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.baseUrl + 'api/auth/';

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

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  getRoles() {
    return localStorage.getItem('roles');
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  onLogout() {
    this.http.post<any>(AUTH_API + 'logout', {}).subscribe({
      next: (res) => {
        // console.log('logout thanh cong');
      },
      error: (err) => {
        // console.log('logout that bai');
      },
    });
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  renewToken(data: any): Observable<any> {
    return this.http.post<any>(AUTH_API + 'refreshtoken', data);
  }
}
