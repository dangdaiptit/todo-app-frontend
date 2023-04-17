import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LoginComponent } from '../login/login.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(public authService: AuthService) {

  }

  getUsername() {
    return localStorage.getItem('username');
  }






}


