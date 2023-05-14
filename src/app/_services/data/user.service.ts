import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  checkExitUserByUsername(username: any) {
    return this.http.get(
      'http://localhost:8080/api/users/check/exist-username?username=' +
        username
    );
  }

  checkExitUserByEmail(email: any) {
    return this.http.get(
      'http://localhost:8080/api/users/check/exist-email?email=' + email
    );
  }

  validPassword(data: any): Observable<any> {
    return this.http.get<any>(
      'http://localhost:8080/api/users/validate-password?oldPassword=' + data
    );
  }

  changePassword(data: any) {
    return this.http.post(
      'http://localhost:8080/api/users/change-password',
      data
    );
  }
  changeEmail(data: any) {
    return this.http.post('http://localhost:8080/api/users/change-email', data);
  }

  getInformationUser() {
    return this.http.get('http://localhost:8080/api/users/user-information');
  }
}
