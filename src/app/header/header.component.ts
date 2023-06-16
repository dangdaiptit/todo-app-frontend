import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRole } from '../model/roles';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  [x: string]: any;
  constructor(public authService: AuthService, public dialog: MatDialog) {}

  getUsername() {
    return localStorage.getItem('username');
  }

  getRoleAdmin() {
    const adminRole = this.authService.getRoles();
    return adminRole?.includes(UserRole.Admin);
  }

  isLogged() {
    return this.authService.isUserLoggedIn();
  }
}
