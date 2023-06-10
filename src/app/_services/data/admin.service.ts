import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get(this.baseUrl+ 'api/admin/users');
  }

  changeEmail(id: any, email: any) {
    return this.http.put(
      `${this.baseUrl}api/admin/users/${id}/change-email`,
      email
    );
  }

  changePassword(id: any, password: any) {
    return this.http.put(
      `${this.baseUrl}api/admin/users/${id}/change-password`,
      password
    );
  }

  changeRoles(id: any, roles: any) {
    return this.http.put(
      `${this.baseUrl}api/admin/users/${id}/change-roles`,
      roles
    );
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.baseUrl}api/admin/users/${id}`);
  }
}
