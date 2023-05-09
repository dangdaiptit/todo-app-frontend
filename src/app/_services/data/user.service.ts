import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  checkExitUserByUsername(username: any) {
    return this.http.get('http://localhost:8080/api/users/check/exist-username?username=' + username);
  }

  checkExitUserByEmail(email: any) {
    return this.http.get('http://localhost:8080/api/users/check/exist-email?email=' + email);
  }


  validPassword(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>('http://localhost:8080/api/users/validate-password?oldPassword=' + data, { headers });
  }

  changePassword(data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:8080/api/users/change-password', data, { headers })
  }


  getInformationUser() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:8080/api/users/user-information', { headers })
  }


}
