import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LoginComponent } from '../login/login.component';

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


