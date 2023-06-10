import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.baseUrl;
  checkExitUserByUsername(username: any) {
    return this.http.get(
      this.baseUrl + 'api/users/check/exist-username?username=' + username
    );
  }

  checkExitUserByEmail(email: any) {
    return this.http.get(
      this.baseUrl + 'api/users/check/exist-email?email=' + email
    );
  }

  validPassword(data: any): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + 'api/users/validate-password?oldPassword=' + data
    );
  }

  changePassword(data: any) {
    return this.http.post(this.baseUrl + 'api/users/change-password', data);
  }
  changeEmail(data: any) {
    return this.http.post(this.baseUrl + 'api/users/change-email', data);
  }

  getInformationUser() {
    return this.http.get(this.baseUrl + 'api/users/user-information');
  }
}
