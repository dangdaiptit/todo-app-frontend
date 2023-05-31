import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get('http://localhost:8080/api/admin/users');
  }

  changeEmail(id: any, email: any) {
    return this.http.put(
      `http://localhost:8080/api/admin/users/${id}/change-email`,
      email
    );
  }

  changePassword(id: any, password: any) {
    return this.http.put(
      `http://localhost:8080/api/admin/users/${id}/change-password`,
      password
    );
  }

  changeRoles(id: any, roles: any) {
    return this.http.put(
      `http://localhost:8080/api/admin/users/${id}/change-roles`,
      roles
    );
  }

  deleteUser(id: any) {
    return this.http.delete(`http://localhost:8080/api/admin/users/${id}`);
  }
}
